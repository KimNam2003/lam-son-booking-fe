import { BASE_URL } from "../../constants/constant";

const DoctorInfo = ({ doctor }) => (
  <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
    <div className="flex gap-6 items-center">
      {doctor.avatarUrl ? (
        <img
          src={`${BASE_URL}/${doctor.avatarUrl}`}
          alt={doctor.fullName}
          className="w-40 h-40 rounded-full object-cover border"
        />
      ) : (
        <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-5xl">👤</div>
      )}
      <div>
        <h1 className="text-3xl font-bold text-cyan-700">{doctor.fullName}</h1>
        <p className="text-xl text-gray-700 mb-2">{doctor.specialty?.name || "Chuyên khoa chưa cập nhật"}</p>
        <p className="text-gray-700 whitespace-pre-line">{doctor.description || "Chưa có mô tả chi tiết."}</p>
        <p className="mt-3 text-sm font-semibold text-gray-800">Kinh nghiệm: {doctor.experienceYears || 0} năm</p>
      </div>
    </div>
  </div>
);

export default DoctorInfo;
