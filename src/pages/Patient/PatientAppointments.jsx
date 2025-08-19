import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getAppointmentsByPatient } from "../../services/api/appointment.api";
import { BASE_URL } from "../../constants/constant";
import { CalendarDays } from "lucide-react";

const PatientAppointments = () => {
  const { user, loadDetails } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        if (user?.roleId) {
          const res = await getAppointmentsByPatient();
          console.log(res.data);
          setAppointments(res.data || []);
        }
      } catch (err) {
        console.error("Lỗi khi load danh sách lịch hẹn:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user?.roleId, loadDetails]);

  if (loading) return <p className="text-center mt-10">⏳ Đang tải...</p>;
  if (!appointments.length) return <p className="text-center mt-10 text-gray-500 italic">Chưa có lịch hẹn nào</p>;

  // Hàm format trạng thái tiếng Việt
  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-cyan-700 mb-5">📋 Lịch hẹn của bạn</h1>
      <div className="space-y-4">
        {appointments.map((app) => {
          const doctor = app.slot?.schedule?.doctor;
          const service = app.slot?.service || app.slot?.schedule?.service;

          const startDate = new Date(app.slot?.startTime);
          const endDate = new Date(app.slot?.endTime);

          const startFormatted = startDate.toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const endFormatted = endDate.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={app.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition shadow-xl"
            >
              {doctor?.avatarUrl ? (
                <img
                  src={`${BASE_URL}/${doctor.avatarUrl}`}
                  alt={doctor.fullName}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-cyan-200 flex items-center justify-center text-2xl">👤</div>
              )}

              <div className="flex-1">
                <h2 className="font-semibold text-lg text-cyan-700">{doctor?.fullName || "Bác sĩ chưa xác định"}</h2>
                <p className="text-gray-600">{service?.name || "Dịch vụ chưa xác định"}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <CalendarDays size={14} /> {startFormatted} - {endFormatted}
                </p>
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  app.status?.toLowerCase() === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : app.status?.toLowerCase() === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status?.toLowerCase() === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {getStatusLabel(app.status)}
              </span>

              {/* Nút */}
              <button
                onClick={() => navigate(`/lich-hen/${app.id}`)}
                className="ml-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm"
              >
                Xem
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientAppointments;
