import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getSpecialties } from "../../services/api/specialties.api";
import { getDoctorById, updateDoctorById } from "../../services/api/doctor.api";

export default function DoctorEdit() {
  const { user } = useAuth();
  const doctorId = user?.roleId;
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchData = async () => {
      try {
        const doctorRes = await getDoctorById(doctorId);
        setDoctor(doctorRes.data);

        const specialtyRes = await getSpecialties();
        setSpecialties(specialtyRes.data.data || []);
      } catch (err) {
        alert("❌ Lỗi tải dữ liệu: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setDoctor((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", doctor.fullName || "");
      formData.append("phone", doctor.phone || "");
      formData.append("experienceYears", doctor.experienceYears || "");
      formData.append("description", doctor.description || "");
      formData.append("specialtyId", doctor.specialtyId || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile); // file upload
      }

      await updateDoctorById(doctorId, formData);
      alert("✅ Cập nhật thành công!");
      navigate("/bac-si/thong-tin-ca-nhan");
    } catch (err) {
      alert("❌ Lỗi cập nhật: " + err.message);
    }
  };

  if (loading) return <div className="p-6">⏳ Đang tải...</div>;
  if (!doctor) return <div className="p-6 text-gray-600">Không tìm thấy thông tin</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">✏️ Chỉnh sửa thông tin bác sĩ</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Họ tên */}
          <div>
            <label className="block font-semibold mb-1">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={doctor.fullName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={doctor.user.email || ""}
              readOnly
              onChange={handleChange}
              className="w-full border p-2 rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed font-medium"
            />
            <p className="text-sm text-gray-500 mt-1">Email không thể thay đổi</p>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block font-semibold mb-1">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={doctor.phone || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Kinh nghiệm */}
          <div>
            <label className="block font-semibold mb-1">Kinh nghiệm (năm)</label>
            <input
              type="number"
              name="experienceYears"
              value={doctor.experienceYears || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block font-semibold mb-1">Mô tả</label>
            <textarea
              name="description"
              value={doctor.description || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              rows="4"
            ></textarea>
          </div>

          {/* Chuyên khoa */}
          <div>
            <label className="block font-semibold mb-1">Chuyên khoa</label>
            <select
              name="specialtyId"
              value={doctor.specialtyId || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">-- Chọn chuyên khoa --</option>
              {specialties.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nút lưu */}
          <div className="pt-4">
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              💾 Lưu thay đổi
            </button>
          </div>

          {/* Avatar */}
          <div>
            <label className="block font-semibold mb-1">Ảnh đại diện</label>
            {doctor.avatar && (
              <img
                src={doctor.avatar}
                alt="Avatar preview"
                className="w-24 h-24 object-cover rounded-full mb-2 border"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}
