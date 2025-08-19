// pages/DoctorProfile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { deleteMyDoctorAccount, getDoctorById } from "../../services/api/doctor.api";
import { BASE_URL } from "../../constants/constant";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const { user, logout } = useAuth();
  const doctorId = user?.roleId;
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const data = await getDoctorById(doctorId);
        setDoctor(data.data);
      } catch (err) {
        setError(err.message || "Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (!doctorId) return <div className="p-6 text-gray-600">Bạn không phải bác sĩ hoặc chưa đăng nhập.</div>;
  if (loading) return <div className="p-6">⏳ Đang tải thông tin bác sĩ...</div>;
  if (error) return <div className="p-6 text-red-500">❌ {error}</div>;
  if (!doctor) return <div className="p-6 text-gray-600">Không tìm thấy thông tin bác sĩ</div>;

  const handleEdit = () => {
    navigate("/bac-si/chinh-sua-thong-tin"); // điều hướng sang trang chỉnh sửa
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;

    try {
      await deleteMyDoctorAccount(doctorId);
      alert("Tài khoản đã được xóa thành công.");
      logout(); // đăng xuất sau khi xóa
      navigate("/dang-nhap"); // điều hướng về trang chủ
    } catch (err) {
      alert(err.message || "❌ Lỗi khi xóa tài khoản");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-xl p-6">
        {/* Avatar */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            src={`${BASE_URL}${doctor.avatarUrl || "/default-avatar.png"}`}
            alt="Avatar"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        {/* Thông tin */}
        <div className="flex-1">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{doctor.fullName || doctor.user?.name}</h1>
            <p className="text-lg text-indigo-600 font-medium">{doctor.specialty?.name || "Chưa có chuyên khoa"}</p>
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Thông tin chi tiết */}
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">📧 Email:</span> {doctor.user?.email || "Chưa có"}
            </p>
            <p>
              <span className="font-semibold">📞 Số điện thoại:</span> {doctor.phone || doctor.user?.phone || "Chưa có"}
            </p>
            <p>
              <span className="font-semibold">💼 Kinh nghiệm:</span>{" "}
              {doctor.experienceYears ? `${doctor.experienceYears} năm` : "Chưa có"}
            </p>
          </div>

          {/* Mô tả */}
          {doctor.description && (
            <p className="mt-6 text-gray-600 border-l-4 border-indigo-500 pl-4 italic leading-relaxed">
              {doctor.description}
            </p>
          )}

          {/* Nút hành động - để dưới cùng */}
          <div className="flex gap-4 pt-6">
            <button onClick={handleEdit} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              ✏️ Chỉnh sửa
            </button>
            <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
              🗑️ Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
