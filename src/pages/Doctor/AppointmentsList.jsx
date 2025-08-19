import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getAppointmentsByDoctor } from "../../services/api/appointment.api";

export default function AppointmentsList() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | confirmed | completed

  // Lấy tất cả lịch hẹn từ API
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAppointmentsByDoctor();
      console.log("Appointments:", data);
      setAppointments(data);
    } catch (err) {
      console.error("❌ Lỗi khi load lịch hẹn:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  const filteredAppointments = appointments.filter((a) => {
    // Chỉ lấy confirmed hoặc completed khi chọn all
    if (statusFilter === "all" && !(a.status === "confirmed" || a.status === "completed")) return false;

    // Lọc theo trạng thái nếu chọn confirmed hoặc completed
    if (statusFilter !== "all" && a.status !== statusFilter) return false;

    // Lọc theo ngày (slot startTime)
    if (selectedDate) {
      const dateStr = new Date(a.slot?.startTime).toISOString().split("T")[0];
      if (dateStr !== selectedDate) return false;
    }

    return true;
  });

  const formatDateTime = (dt) =>
    new Date(dt).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📅 Danh sách lịch hẹn</h1>

      {/* Bộ lọc */}
      <div className="flex items-center space-x-3">
        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="completed">Đã hoàn thành</option>
        </select>
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white shadow-md rounded-md border p-5">
        {loading ? (
          <div>⏳ Đang tải...</div>
        ) : filteredAppointments.length ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Bệnh nhân</th>
                <th className="border px-3 py-2">Dịch vụ</th>
                <th className="border px-3 py-2">Giờ khám</th>
                <th className="border px-3 py-2">Trạng thái</th>
                <th className="border px-3 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{a.patient?.fullName || "N/A"}</td>
                  <td className="border px-3 py-2">{a.slot.service?.name || "N/A"}</td>
                  <td className="border px-3 py-2">{formatDateTime(a.slot?.startTime)}</td>
                  <td className="border px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        a.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : a.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <Link
                      to={`/bac-si/lich-hen/${a.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500 italic text-center py-6">Không có lịch hẹn nào</div>
        )}
      </div>
    </div>
  );
}
