// pages/ScheduleManagement.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ScheduleForm from "../../components/Doctor/ScheduleForm";
import { useAuth } from "../../context/useAuth";
import { BASE_URL } from "../../constants/constant";
const weekdayMap = {
  Sunday: "CN",
  Monday: "2",
  Tuesday: "3",
  Wednesday: "4",
  Thursday: "5",
  Friday: "6",
  Saturday: "7",
};
export default function ScheduleManagement() {
  const { user } = useAuth();
  const doctorId = user?.roleId;

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSchedule, setNewSchedule] = useState({ weekday: "", startTime: "", endTime: "" });
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    if (!doctorId) return;
    axios
      .get(`${BASE_URL}/schedules`, { params: { doctorId } })
      .then(({ data }) => setSchedules(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [doctorId]);

  const timeToMinutes = (t) => t.split(":").reduce((acc, val, i) => acc + (i === 0 ? +val * 60 : +val), 0);

  const isConflict = (s, excludeId = null) => {
    const newStart = timeToMinutes(s.startTime);
    const newEnd = timeToMinutes(s.endTime);
    return schedules.some(
      (sch) =>
        sch.weekday === s.weekday &&
        sch.id !== excludeId &&
        newStart < timeToMinutes(sch.endTime) &&
        newEnd > timeToMinutes(sch.startTime)
    );
  };

  const handleSave = async (schedule, editing = false) => {
    if (!schedule.weekday || !schedule.startTime || !schedule.endTime) return alert("Vui lòng điền đầy đủ thông tin");
    if (isConflict(schedule, editing ? schedule.id : null)) return alert("❌ Lịch trình giao nhau!");

    const formatTime = (time) => time.slice(0, 5);
    // 🔑 tạo payload chuẩn
    const payload = {
      doctorId,
      weekday: schedule.weekday,
      startTime: formatTime(schedule.startTime),
      endTime: formatTime(schedule.endTime),
    };

    try {
      const res = editing
        ? await axios.patch(`${BASE_URL}/schedules/${schedule.id}`, payload)
        : await axios.post(`${BASE_URL}/schedules`, payload);

      const updated = res.data.data || res.data;
      setSchedules(editing ? schedules.map((s) => (s.id === updated.id ? updated : s)) : [...schedules, updated]);

      editing ? setEditingSchedule(null) : setNewSchedule({ weekday: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi lưu lịch trình");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa lịch trình này?")) return;
    try {
      await axios.delete(`${BASE_URL}/schedules/${id}`);
      setSchedules(schedules.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa lịch trình");
    }
  };

  if (!doctorId) return <div className="p-6">Bạn không phải bác sĩ hoặc chưa đăng nhập.</div>;
  if (loading) return <div className="p-6">⏳ Đang tải lịch trình...</div>;

  return (
    <div className="p-6 space-y-6 relative">
      <h1 className="text-2xl font-bold">📅 Quản lý lịch trình</h1>

      <ScheduleForm
        schedule={newSchedule}
        setSchedule={setNewSchedule}
        onSubmit={() => handleSave(newSchedule)}
        submitText="➕ Thêm lịch trình"
      />

      <div className="bg-white shadow-md rounded-md border p-5">
        <h2 className="text-lg font-semibold mb-4">📋 Danh sách lịch trình</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Thứ</th>
              <th className="border px-3 py-2">Giờ bắt đầu</th>
              <th className="border px-3 py-2">Giờ kết thúc</th>
              <th className="border px-3 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length ? (
              schedules.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{weekdayMap[s.weekday]}</td>
                  <td className="border px-3 py-2">{s.startTime}</td>
                  <td className="border px-3 py-2">{s.endTime}</td>
                  <td className="border px-3 py-2 text-center space-x-2">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                      onClick={() => setEditingSchedule({ ...s })}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(s.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                  Chưa có lịch trình nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa */}
      {editingSchedule && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingSchedule(null);
          }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-[500px] max-w-full">
            <ScheduleForm
              schedule={editingSchedule}
              setSchedule={setEditingSchedule}
              onSubmit={() => handleSave(editingSchedule, true)}
              submitText="💾 Lưu chỉnh sửa"
            />
            <button
              className="mt-3 bg-gray-400 text-white w-full py-2 rounded hover:bg-gray-500 transition"
              onClick={() => setEditingSchedule(null)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
