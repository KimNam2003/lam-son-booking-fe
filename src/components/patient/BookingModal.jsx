import { useState, useEffect } from "react";
import { getPatientById } from "../../services/api/patient.api";
import { useAuth } from "../../context/useAuth";
export const GENDER_LABELS = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

const BookingModal = ({ isOpen, onClose, onConfirm, doctor, selectedDate, slot, loading }) => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!user) return;
    getPatientById(user.roleId).then(setPatient).catch(console.error);
  }, [user]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 transform -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2">
        {/* Thông tin bác sĩ */}
        <div className="flex-1 bg-cyan-50 rounded-xl p-4 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-700">Thông tin bác sĩ</h2>
          <p className="font-semibold">{doctor.fullName}</p>
          <p>{doctor.specialty?.name}</p>
          <h3 className="text-lg font-semibold mt-4">Lịch hẹn</h3>
          <p>Ngày: {selectedDate.split("-").reverse().join("/")}</p>
          <p>
            Giờ: {slot?.startTime?.substring(11, 16)} - {slot?.endTime?.substring(11, 16)}
          </p>
          <p>
            <strong>Giá dịch vụ:</strong>{" "}
            {(Number(slot?.service?.price) || 0).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>

        {/* Thông tin bệnh nhân */}
        <div className="flex-1 bg-white rounded-xl p-4 border border-gray-200 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-700">Thông tin bệnh nhân</h2>
          {patient ? (
            <div className="space-y-1">
              <p>
                <strong>Họ tên:</strong> {patient.fullName}
              </p>
              <p>
                <strong>Ngày sinh:</strong> {patient.dateOfBirth}
              </p>
              <p>
                <strong>Giới tính:</strong> {GENDER_LABELS[patient.gender] || "Khác"}
              </p>
              <p>
                <strong>Điện thoại:</strong> {patient.phone}
              </p>
            </div>
          ) : (
            <p>Đang tải thông tin bệnh nhân...</p>
          )}

          <div>
            <label className="block font-semibold mb-2">Ghi chú</label>
            <textarea
              className="w-full border rounded-lg p-2 focus:outline-cyan-500 resize-none h-24"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú nếu cần"
            />
          </div>

          <div className="flex gap-4 mt-2">
            <button
              className="flex-1 py-3 rounded-md border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className={`flex-1 py-3 rounded-md text-white font-semibold transition ${
                loading || !patient ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"
              }`}
              onClick={() => onConfirm({ note, price: slot?.service?.price || 0 })}
              disabled={loading || !patient}
            >
              {loading ? "Đang xử lý..." : "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
