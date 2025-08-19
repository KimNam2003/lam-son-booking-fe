// src/pages/Doctor/DoctorDashboard.jsx
export default function HomeDotor() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">👨‍⚕️ Doctor Dashboard</h1>
      <p className="mb-6">
        Xin chào, <strong>{user?.fullName || "Bác sĩ"}</strong>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quản lý lịch khám */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg mb-2">📅 Quản lý lịch khám</h2>
          <p className="text-sm text-gray-600">Xem và chỉnh sửa lịch khám của bạn.</p>
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Xem lịch</button>
        </div>

        {/* Hồ sơ bệnh nhân */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg mb-2">🩺 Hồ sơ bệnh nhân</h2>
          <p className="text-sm text-gray-600">Xem thông tin bệnh nhân đã khám.</p>
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Xem hồ sơ</button>
        </div>

        {/* Cài đặt tài khoản */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg mb-2">⚙️ Cài đặt</h2>
          <p className="text-sm text-gray-600">Chỉnh sửa thông tin cá nhân, đổi mật khẩu.</p>
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Cài đặt</button>
        </div>
      </div>
    </div>
  );
}
