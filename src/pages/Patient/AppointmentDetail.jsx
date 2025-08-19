import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAppointmentById, updateAppointmentStatus } from "../../services/api/appointment.api";
import { BASE_URL } from "../../constants/constant";
import { useAuth } from "../../context/useAuth";
import { AppointmentStatus } from "../../constants/appointmentStatus";
import { CalendarDays, Clock, User, Stethoscope, FileText, CreditCard, Mail, Phone, MapPin, Award } from "lucide-react";

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await getAppointmentById(id);
        setAppointment(res.data);
        setError(null);
      } catch {
        setError("Không tìm thấy thông tin lịch hẹn");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Bạn có chắc muốn hủy lịch hẹn này?")) return;
    setCancelLoading(true);
    try {
      await updateAppointmentStatus(id, AppointmentStatus.CANCELLED);
      alert("✅ Lịch hẹn đã được hủy");
      navigate(`/benh-nhan/${user.roleId}`);
    } catch {
      alert("❌ Hủy lịch thất bại");
    } finally {
      setCancelLoading(false);
    }
  };

  const handlePayment = async () => {
    setPayLoading(true);
    try {
      // API thanh toán sẽ được tích hợp ở đây
      alert("💳 Thanh toán thành công!");
    } catch {
      alert("❌ Thanh toán thất bại");
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg animate-pulse">⏳ Đang tải chi tiết lịch hẹn...</p>;
  if (error || !appointment) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const { slot, status, price, note, isPaid } = appointment;
  const doctor = slot?.schedule?.doctor;
  const service = slot?.service;

  const statusColor = {
    [AppointmentStatus.PENDING]: "bg-yellow-500",
    [AppointmentStatus.CONFIRMED]: "bg-green-500",
    [AppointmentStatus.CANCELLED]: "bg-gray-500",
  };
  const statusBg = statusColor[status] || "bg-red-500";

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-b from-cyan-50 to-white rounded-2xl shadow-xl space-y-8 animate-fadeIn">
      {/* Header trạng thái */}
      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow border">
        <h1 className="text-2xl font-bold text-cyan-700 flex items-center gap-3">📋 Chi tiết lịch hẹn</h1>
        <span className={`px-4 py-1 rounded-full text-white text-sm font-medium ${statusBg}`}>{status}</span>
      </div>

      {/* Thông tin bác sĩ */}
      <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-[1.01]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Ảnh bác sĩ */}
          {doctor?.avatarUrl ? (
            <img
              src={`${BASE_URL}/${doctor.avatarUrl}`}
              alt={doctor.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-cyan-100 flex items-center justify-center text-5xl text-cyan-700">
              <User size={40} />
            </div>
          )}

          {/* Chi tiết bác sĩ */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{doctor?.fullName || "Không rõ bác sĩ"}</h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Stethoscope size={18} /> {doctor?.specialty?.name || "Chuyên khoa chưa cập nhật"}
            </p>
            {doctor?.experienceYears && (
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Award size={18} /> {doctor.experienceYears} năm kinh nghiệm
              </p>
            )}
            {doctor?.email && (
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Mail size={18} /> {doctor.email}
              </p>
            )}
            {doctor?.phone && (
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Phone size={18} /> {doctor.phone}
              </p>
            )}
            {doctor?.description && <p className="text-gray-600 mt-3 italic">“{doctor.description}”</p>}
          </div>
        </div>
      </div>

      {/* Thông tin dịch vụ */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText size={18} /> <span className="font-medium">Dịch vụ</span>
          </div>
          <p className="mt-1 text-lg font-semibold">{service?.name || "Không rõ"}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-cyan-500">
          <div className="flex items-center gap-2 text-gray-600">
            <CreditCard size={18} /> <span className="font-medium">Giá</span>
          </div>
          <p className="mt-1 text-lg font-semibold">{price?.toLocaleString()} VNĐ</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays size={18} /> <span className="font-medium">Ngày</span>
          </div>
          <p className="mt-1 text-lg font-semibold">
            {slot?.startTime?.substring(0, 10).split("-").reverse().join("/")}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} /> <span className="font-medium">Giờ</span>
          </div>
          <p className="mt-1 text-lg font-semibold">
            {slot?.startTime?.substring(11, 16)} - {slot?.endTime?.substring(11, 16)}
          </p>
        </div>
      </div>

      {/* Ghi chú */}
      {note && (
        <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
          <p className="font-semibold mb-1">📝 Ghi chú:</p>
          <p>{note}</p>
        </div>
      )}

      {/* Nút hành động */}
      <div className="flex flex-col sm:flex-row gap-4">
        {status === AppointmentStatus.PENDING && user?.role === "patient" && (
          <button
            onClick={handleCancel}
            disabled={cancelLoading}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            {cancelLoading ? "⏳ Đang hủy..." : "❌ Hủy lịch hẹn"}
          </button>
        )}
        {!isPaid &&
          status !== AppointmentStatus.CANCELLED &&
          status !== AppointmentStatus.COMPLETED &&
          status !== "REJECTED" && (
            <button
              onClick={handlePayment}
              disabled={payLoading}
              className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              {payLoading ? (
                "⏳ Đang thanh toán..."
              ) : (
                <>
                  <CreditCard size={18} /> Thanh toán
                </>
              )}
            </button>
          )}
      </div>
    </div>
  );
};

export default AppointmentDetail;
