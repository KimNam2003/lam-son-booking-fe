// pages/doctor/PendingAppointments.jsx
import { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle, Calendar } from "lucide-react";
import { getAppointmentsByDoctor, updateAppointmentStatus } from "../../services/api/appointment.api";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu từ backend
  useEffect(() => {
    async function fetchPending() {
      try {
        const data = await getAppointmentsByDoctor("pending");
        console.log(data);
        setAppointments(data);
      } catch (err) {
        console.error("❌ Lỗi khi load lịch hẹn:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPending();
  }, []);

  // ✅ Xác nhận lịch hẹn
  const handleConfirm = async (id) => {
    try {
      await updateAppointmentStatus(id, "confirmed");
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("❌ Lỗi xác nhận lịch hẹn:", err);
    }
  };

  // ❌ Từ chối lịch hẹn
  const handleReject = async (id) => {
    try {
      await updateAppointmentStatus(id, "rejected");
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("❌ Lỗi từ chối lịch hẹn:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
    );

  if (appointments.length === 0)
    return (
      <div className="p-6 text-center text-gray-600 bg-gray-50 rounded-xl">
        <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-400" />
        <p>Hiện không có lịch hẹn nào chờ xác nhận.</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">🕑 Lịch hẹn chờ xác nhận</h1>
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="p-5 bg-white shadow-sm rounded-xl border border-gray-200 flex justify-between items-center hover:shadow-md transition"
          >
            {/* Thông tin lịch hẹn */}
            <div className="space-y-1">
              <p className="font-medium text-gray-800">👤 {appt.patient?.fullName}</p>
              <p className="text-sm text-gray-600">📞 {appt.patient?.phone || "—"}</p>
              <p className="text-sm text-gray-700">
                <strong>Dịch vụ:</strong> {appt.slot.service?.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Thời gian:</strong>{" "}
                {appt.slot
                  ? `${new Date(appt.slot.startTime).toLocaleString("vi-VN")} - ${new Date(
                      appt.slot.endTime
                    ).toLocaleTimeString("vi-VN")}`
                  : "Chưa rõ"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Giá:</strong> {appt.price ? appt.price.toLocaleString("vi-VN") + "₫" : "—"}
              </p>
            </div>

            {/* Nút thao tác */}
            <div className="flex gap-3">
              <button
                onClick={() => handleConfirm(appt.id)}
                className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                <CheckCircle size={18} /> Xác nhận
              </button>
              <button
                onClick={() => handleReject(appt.id)}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                <XCircle size={18} /> Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingAppointments;
