import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAppointmentById } from "../../services/api/appointment.api";
import { GENDER_LABELS } from "../../components/patient/BookingModal";

export default function DoctorAppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const { data } = await getAppointmentById(id);
        setAppointment(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleComplete = async () => {
    try {
      await axios.post("/", {
        appointment_id: appointment.id,
        diagnosis,
        prescription,
        summary,
      });

      await axios.patch(`/api/appointments/${appointment.id}`, {
        status: "completed",
      });

      alert("Hoàn thành lịch khám!");
      navigate("/bac-si/lich-hen");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi hoàn thành lịch khám.");
    }
  };

  if (loading) return <div className="text-left py-10">Đang tải...</div>;
  if (!appointment) return <div className="text-left py-10">Không tìm thấy lịch hẹn</div>;

  const { patient, slot } = appointment;
  const service = slot?.service;
  const doctor = slot?.schedule?.doctor;

  return (
    <div className="max-w-4xl mx-0 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-left">Chi tiết khám bệnh</h1>

      {/* Card thông tin bệnh nhân */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Bệnh nhân</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Họ tên:</span> {patient.fullName}
          </p>
          <p>
            <span className="font-semibold">Ngày sinh:</span> {patient.dateOfBirth}
          </p>
          <p>
            <span className="font-semibold">Số điện thoại:</span> {patient.phone}
          </p>
          <p>
            <span className="font-semibold">Giới tính:</span> {GENDER_LABELS[patient.gender] || "Khác"}
          </p>
        </div>
      </div>

      {/* Card thông tin lịch hẹn */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Thông tin lịch hẹn</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Dịch vụ:</span> {service?.name}
          </p>
          <p>
            <span className="font-semibold">Giá:</span> {appointment.price.toLocaleString("vi-VN")} VND
          </p>
          <p>
            <span className="font-semibold">Bác sĩ:</span> {doctor?.fullName}
          </p>
          <p>
            <span className="font-semibold">Thời gian:</span> {new Date(slot.startTime).toLocaleString()} -{" "}
            {new Date(slot.endTime).toLocaleTimeString()}
          </p>
          <p className="col-span-2">
            <span className="font-semibold">Ghi chú:</span> {appointment.note || "Không có"}
          </p>
          <p className="col-span-2">
            <span className="font-semibold">Mô tả bác sĩ:</span> {doctor?.description}
          </p>
        </div>
      </div>

      {/* Card kết quả khám */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">Kết quả khám</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Chẩn đoán</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-300"
              rows={3}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Nhập chẩn đoán"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Kê đơn thuốc</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-300"
              rows={3}
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Nhập kê đơn"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tóm tắt khám</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-300"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Nhập tóm tắt khám"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start space-x-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded"
          onClick={() => navigate("/bac-si/lich-hen")}
        >
          Quay lại
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow"
          onClick={handleComplete}
        >
          Hoàn thành
        </button>
      </div>
    </div>
  );
}
