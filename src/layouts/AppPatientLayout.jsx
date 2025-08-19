import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppPatientLayout() {
  return (
    <div>
      <div>
        <Header />
        <main className="w-[90%] mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
