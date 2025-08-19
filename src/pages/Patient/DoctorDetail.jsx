import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorById } from "../../services/api/doctor.api";
import { createAppointment } from "../../services/api/appointment.api";
import { getSlotsByDate } from "../../services/api/appointmentSlot.api";
import { useAuth } from "../../context/useAuth";
import BookingModal from "../../components/patient/BookingModal";
import DateDropdown from "../../utils/formatDate";
import { BASE_URL } from "../../constants/constant";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const serviceId = Number(new URLSearchParams(window.location.search).get("serviceId")) || null;

  useEffect(() => setSelectedDate(new Date().toISOString().split("T")[0]), []);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorById(id);
        setDoctor(res.data);
        setError(null);
      } catch {
        setError("Lỗi khi tải thông tin bác sĩ");
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  useEffect(() => {
    if (!selectedDate || !doctor?.schedules || !serviceId) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }

    const weekday = new Date(selectedDate).toLocaleString("en-US", {
      weekday: "long",
    });
    const schedules = doctor.schedules.filter((s) => s.weekday.toLowerCase() === weekday.toLowerCase());

    if (!schedules.length) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }

    const fetchSlots = async () => {
      try {
        const results = await Promise.all(schedules.map((sch) => getSlotsByDate(sch.id, serviceId, selectedDate)));
        const mergedSlots = results
          .flatMap((res) => res.data || [])
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setSlots(mergedSlots);
        setSelectedSlot(null);
      } catch {
        setSlots([]);
        setSelectedSlot(null);
      }
    };

    fetchSlots();
  }, [selectedDate, doctor, serviceId]);

  const handleBookingClick = () => {
    if (!user) {
      alert("⚠ Vui lòng đăng nhập trước khi đặt lịch.");
      navigate("/dang-nhap");
      return;
    }
    if (selectedSlot === null) return;
    if (slots[selectedSlot]?.isBooked) return; // nếu slot đã được đặt thì không cho đặt
    setShowModal(true);
  };

  const handleConfirmBooking = async ({ note }) => {
    const slot = slots[selectedSlot];
    if (!slot) return;
    setBookingLoading(true);
    try {
      await createAppointment({
        slotId: slot.id,
        note,
      });
      setShowModal(false);
      navigate(`/benh-nhan/${user.roleId}`);
    } catch (err) {
      alert("❌ Đặt lịch thất bại. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">⏳ Đang tải thông tin bác sĩ...</p>;
  if (error || !doctor) return <p className="text-center mt-10 text-red-500">{error || "Không tìm thấy bác sĩ"}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-12 p-10 bg-white rounded-xl shadow-md flex flex-col lg:flex-row gap-10 text-lg">
      {/* LEFT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          {doctor.avatarUrl ? (
            <img
              src={`${BASE_URL}/${doctor.avatarUrl}`}
              alt={doctor.fullName}
              className="w-48 h-48 rounded-full object-cover border-4 border-cyan-500"
            />
          ) : (
            <div className="w-48 h-48 rounded-full bg-cyan-200 flex items-center justify-center text-8xl text-cyan-700">
              👤
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-cyan-700">{doctor.fullName}</h1>
            <p className="text-cyan-600 text-lg">{doctor.specialty?.name || "Chuyên khoa chưa cập nhật"}</p>
          </div>
        </div>
        <div className="space-y-2 text-base text-gray-700">
          <p>{doctor.description || "Chưa có mô tả chi tiết."}</p>
          <p>
            <strong>Kinh nghiệm:</strong> {doctor.experienceYears || 0} năm
          </p>
          <p>📞 {doctor.phone || "Chưa cập nhật"}</p>
          <p>📍 Hà Nội</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 bg-gray-50 rounded-lg p-8 shadow-inner space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-3 text-lg">🗓 Chọn ngày khám:</label>
          <DateDropdown selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>

        {selectedDate && (
          <>
            <p className="text-cyan-700 font-semibold text-base mb-2">
              Lịch khám ngày {selectedDate.split("-").reverse().join("/")}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {slots.length > 0 ? (
                slots.map((slot, idx) => {
                  const label = `${slot.startTime.substring(11, 16)} - ${slot.endTime.substring(11, 16)}`;
                  const isSelected = selectedSlot === idx;
                  const isBlocked = slot.isBooked;

                  return (
                    <button
                      key={idx}
                      onClick={() => !isBlocked && setSelectedSlot(idx)}
                      disabled={isBlocked}
                      className={`px-5 py-3 rounded-lg text-sm font-medium border transition
                        ${
                          isBlocked
                            ? "bg-gray-200 text-gray-400 border-gray-300 opacity-50 cursor-not-allowed"
                            : isSelected
                            ? "bg-cyan-600 text-white border-cyan-600"
                            : "bg-white hover:bg-cyan-100 border-gray-300"
                        }`}
                    >
                      {label}
                    </button>
                  );
                })
              ) : (
                <p className="col-span-full text-gray-500 italic">Không có slot khả dụng.</p>
              )}
            </div>
          </>
        )}

        <div className="pt-4">
          <button
            onClick={handleBookingClick}
            disabled={selectedSlot === null || slots[selectedSlot]?.isBooked}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${
              selectedSlot !== null && !slots[selectedSlot]?.isBooked
                ? "bg-cyan-600 hover:bg-cyan-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Đặt lịch
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={showModal}
        doctor={doctor}
        selectedDate={selectedDate}
        slot={slots[selectedSlot]}
        patient={user}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmBooking}
        loading={bookingLoading}
      />
    </div>
  );
};

export default DoctorDetail;
