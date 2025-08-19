import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/constant";
import WeeklySchedule from "./WeeklySchedule";

const DoctorCard = ({ doctor, service }) => (
  <div className="rounded-xl p-6 shadow-md flex flex-col md:flex-row gap-6 bg-white hover:shadow-lg transition-shadow">
    <div className="md:w-3/5 flex gap-4">
      {doctor.avatarUrl ? (
        <img
          src={`${BASE_URL}/${doctor.avatarUrl}`}
          alt={doctor.fullName}
          className="w-32 h-32 rounded-full object-cover border"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-3xl">👤</div>
      )}
      <div>
        <p className="text-xl font-bold text-cyan-700">{doctor.fullName}</p>
        <p className="text-lg text-gray-600 mb-1">{doctor.specialty?.name || "Chuyên khoa chưa cập nhật"}</p>
        <p className="text-gray-700 text-sm whitespace-pre-line mb-2">
          {doctor.description || "Chưa có mô tả chi tiết."}
        </p>
        <p className="text-sm font-semibold text-gray-800">Kinh nghiệm: {doctor.experienceYears || 0} năm</p>
        <p className="text-sm">
          <strong>💰 Giá khám:</strong> {Number(service.price).toLocaleString()}₫
        </p>
        <Link
          to={`/bac-si/${doctor.id}?serviceId=${service.id}`}
          className="text-blue-600 hover:underline text-sm mt-2 block"
        >
          Xem chi tiết bác sĩ →
        </Link>
      </div>
    </div>

    <div className="md:w-2/5 border-t md:border-t-0 md:border-l md:pl-6 pl-0 pt-4 md:pt-0 border-gray-200">
      <p className="text-sm mb-3 text-gray-700 font-medium">📅 Lịch khám</p>
      <WeeklySchedule schedules={doctor.schedules} />
    </div>
  </div>
);

export default DoctorCard;
