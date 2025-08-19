import { createBrowserRouter } from "react-router-dom";
import AppPatientLayout from "../layouts/AppPatientLayout";
import AppDoctorLayout from "../layouts/AppDoctorLayout";
import Login from "../pages/LoginPage";
import HomePage from "../pages/Patient/HomePage";
import SpecialtyList from "../pages/Patient/SpecialtyList";
import SpecialtyDetail from "../pages/Patient/SpecialtyDetail";
import ServiceDetail from "../pages/Patient/ServiceDetail";
import DoctorDetail from "../pages/Patient/DoctorDetail";
import Register from "../pages/Register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import "../../src/index.css";
import AppointmentDetail from "../pages/Patient/AppointmentDetail";
import PatientAppointments from "../pages/Patient/PatientAppointments";
import ProfilePage from "../pages/Patient/ProfilePage";
import ScheduleManagement from "../pages/Doctor/ScheduleManagementPage";
import DoctorSchedule from "../pages/Doctor/DoctorSchedulePage";
import HistoryList from "../pages/Doctor/HistoryListPage";
import HomeDoctor from "../pages/Doctor/HomeDoctorPage";
import PendingAppointments from "../pages/Doctor/DoctorAppointment";
import AppointmentsList from "../pages/Doctor/AppointmentsList";
import DoctorAppointmentDetail from "../pages/Doctor/AppointmentDetailPage";
import DoctorProfile from "../pages/Doctor/DoctorProfilePage";
import EditDoctorProfile from "../pages/Doctor/EditDoctorProfile";
const router = createBrowserRouter([
  // Layout bệnh nhân
  {
    path: "/",
    element: <AppPatientLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "chuyen-khoa", element: <SpecialtyList /> },
      { path: "chuyen-khoa/:id/dich-vu", element: <SpecialtyDetail /> },
      { path: "dich-vu/:id/bac-si", element: <ServiceDetail /> },
      { path: "bac-si/:id", element: <DoctorDetail /> },
      { path: "thong-tin-ca-nhan", element: <ProfilePage /> },
      { path: "lich-su-kham", element: <h1> Đây là trang lịch sử khám của bệnh nhân</h1> },

      {
        path: "benh-nhan/:id",
        element: (
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientAppointments />
          </ProtectedRoute>
        ),
      },
      { path: "lich-hen/:id", element: <AppointmentDetail /> },
      { path: "/dang-nhap", element: <Login /> },
      { path: "/dang-ky", element: <Register /> },
    ],
  },

  // Layout bác sĩ
  {
    path: "bac-si",
    element: (
      <ProtectedRoute allowedRoles={["doctor"]}>
        <AppDoctorLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "trang-chu", index: true, element: <HomeDoctor /> },
      { path: "thoi-khoa-bieu", element: <DoctorSchedule /> },
      {
        path: "lich-hen",
        children: [
          { path: "cho-xac-nhan", element: <PendingAppointments /> },
          { path: "da-xac-nhan", element: <AppointmentsList /> },
          { path: ":id", element: <DoctorAppointmentDetail /> },
        ],
      },

      { path: "lich-trinh", element: <ScheduleManagement /> },
      { path: "lich-su-kham", element: <HistoryList /> },
      { path: "ngay-nghi", element: <h1> Đây là trang quản lý ngày nghỉ </h1> },
      { path: "thong-tin-ca-nhan", element: <DoctorProfile /> }, // Hồ sơ cá nhân
      { path: "chinh-sua-thong-tin", element: <EditDoctorProfile /> }, // Hồ sơ cá nhân
    ],
  },

  // Auth routes (không dùng layout)

  // Not found
  { path: "*", element: <h1>Not Found</h1> },
]);

export default router;
