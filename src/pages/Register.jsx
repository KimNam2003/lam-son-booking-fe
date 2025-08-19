// src/pages/RegisterPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getSpecialties } from "../services/api/specialties.api";
import { signUpUser } from "../services/api/authService";
export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  // Doctor fields
  const [doctorFullName, setDoctorFullName] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [description, setDescription] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Patient fields
  const [patientFullName, setPatientFullName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState(null);

  // Gọi API specialties từ backend
  useEffect(() => {
    getSpecialties()
      .then((res) => {
        setSpecialties(res.data.data);
      })
      .catch((err) => console.error("Lỗi tải specialties:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!role) {
      setError("Vui lòng chọn Role");
      return;
    }

    let profile = {};

    if (role === "doctor") {
      profile = {
        fullName: doctorFullName,
        phone: doctorPhone || undefined,
        description: description || undefined,
        specialtyId: parseInt(specialtyId),
        experienceYears: experienceYears ? parseInt(experienceYears) : undefined,
      };
    } else if (role === "patient") {
      profile = {
        fullName: patientFullName,
        phone: patientPhone || undefined,
        gender: gender || undefined,
        dateOfBirth: dateOfBirth || undefined,
        address: address || undefined,
      };
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("profile", JSON.stringify(profile));
      if (avatar) {
        formData.append("avatar", avatar);
      }

      await signUpUser(formData);
      alert("Đăng ký thành công!");
      navigate("/dang-nhap");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-[#a1c4fd] via-[#c2e9fb] to-[#fbc2eb] shadow-lg rounded-xl p-6">
        {/* Left: Logo */}
        <div className="flex items-center justify-center">
          <img src="/src/assets/logo.png" alt="Logo" className="max-h-[400px] w-auto object-contain" />
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md overflow-y-auto max-h-[90vh] p-2">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Register</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && <div className="text-red-600 text-center mb-3">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">-- Chọn Role --</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>

              {/* Doctor fields */}
              {role === "doctor" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={doctorFullName}
                      onChange={(e) => setDoctorFullName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={doctorPhone}
                      onChange={(e) => setDoctorPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                    <select
                      value={specialtyId}
                      onChange={(e) => setSpecialtyId(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    >
                      <option value="">-- Chọn chuyên môn --</option>
                      {specialties.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Years</label>
                    <input
                      type="number"
                      min={0}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAvatar(e.target.files[0])}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              {/* Patient fields */}
              {role === "patient" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={patientFullName}
                      onChange={(e) => setPatientFullName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">-- Chọn giới tính --</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-md font-medium shadow hover:opacity-90 transition"
              >
                Register
              </button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <a href="/dang-nhap" className="text-indigo-600 font-medium hover:underline">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
