import { useEffect, useState } from "react";
import { FaUser, FaPhoneAlt, FaBirthdayCake, FaVenusMars } from "react-icons/fa";
import { useAuth } from "../../context/useAuth";
import { getPatientById } from "../../services/api/patient.api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!user) return;
      try {
        const data = await getPatientById(user.roleId);
        setPatient(data);
      } catch (err) {
        setError("Không thể lấy thông tin cá nhân.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [user]);

  if (loading) return <div className="text-center mt-20 text-gray-500">Đang tải thông tin...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!patient) return <div className="text-center mt-20 text-gray-500">Không tìm thấy thông tin cá nhân</div>;

  // Chuyển giới tính hiển thị: female => Nữ, male => Nam
  const formatGender = (gender) => {
    if (!gender) return "Chưa cập nhật";
    return gender.toLowerCase() === "female" ? "Nữ" : gender.toLowerCase() === "male" ? "Nam" : gender;
  };

  const infoRows = [
    { label: "Họ và tên", value: patient.fullName || "Chưa cập nhật", icon: <FaUser className="text-blue-500" /> },
    {
      label: "Số điện thoại",
      value: patient.phone || "Chưa cập nhật",
      icon: <FaPhoneAlt className="text-green-500" />,
    },
    {
      label: "Ngày sinh",
      value: patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "Chưa cập nhật",
      icon: <FaBirthdayCake className="text-pink-500" />,
    },
    { label: "Giới tính", value: formatGender(patient.gender), icon: <FaVenusMars className="text-purple-500" /> },
    { label: "Email", value: patient.user?.email || "Chưa cập nhật" },
    { label: "Vai trò", value: patient.user?.role || "Chưa cập nhật" },
  ];

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-3">
        <FaUser /> Thông tin cá nhân
      </h2>

      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 space-y-2">
        {infoRows.map((row, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              {row.icon && row.icon}
              <span className="text-gray-500 font-medium">{row.label}</span>
            </div>
            <span className="text-gray-800">{row.value}</span>
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => alert("Chức năng chỉnh sửa")}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => alert("Chức năng xóa tài khoản")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Xóa tài khoản
          </button>
        </div>
      </div>

      {/* Lịch sử đặt khám
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-700">
          <FaCalendarAlt /> Lịch sử đặt khám
        </h2>
        {patient.appointments && patient.appointments.length > 0 ? (
          <div className="space-y-4">
            {patient.appointments.map((appt) => (
              <div
                key={appt.id}
                className="border-l-4 border-green-400 p-4 rounded-md bg-green-50 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between">
                  <div>
                    <strong>Ngày khám:</strong> {new Date(appt.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Trạng thái:</strong>{" "}
                    <span className={appt.isBooked ? "text-green-600 font-semibold" : "text-gray-400"}>
                      {appt.isBooked ? "Đã đặt" : "Chưa đặt"}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>Bác sĩ:</strong> {appt.doctorName || "Chưa cập nhật"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">Chưa có lịch sử đặt khám</div>
        )} 
     </div> */}
    </div>
  );
}
