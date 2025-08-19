import { Outlet } from "react-router-dom";
import DoctorSidebar from "../components/Doctor/DoctorSidebar";
import DoctorHeader from "../components/Doctor/DoctorHeader";

export default function AppDoctorLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col">
        <DoctorHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
