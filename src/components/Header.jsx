import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaUser, FaHeart, FaCalendarAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Trang chủ", path: "/" },
  { label: "Giới thiệu", path: "/gioi-thieu" },
  { label: "Dịch vụ", path: "/dich-vu" },
  { label: "Bác sĩ", path: "/bac-si" },
  { label: "Đặt lịch khám", path: "/dat-lich-kham" },
  { label: "Tin tức", path: "/tin-tuc" },
  { label: "Liên hệ", path: "/lien-he" },
];

const accountMenuItems = [
  { label: "Đăng nhập", path: "/dang-nhap" },
  { label: "Đổi mật khẩu", path: "/doi-mat-khau" },
  { label: "Đăng xuất", path: "/dang-xuat" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar luôn hiển thị */}
      <div className="bg-blue-600 text-white text-sm md:text-base px-4 md:px-10 py-2 flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:gap-6 gap-1">
          <span className="flex items-center gap-2">
            <FaPhoneAlt /> +1 777 123 4567
          </span>
          <span className="flex items-center gap-2">
            <FaEnvelope /> mail@domain.com
          </span>
        </div>

        {/* Account actions tách riêng từng phần */}
        <div className="flex items-center gap-4 text-sm relative">
          {/* Tài khoản với menu con */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer group-hover:text-gray-200">
              <FaUser /> Tài khoản
            </div>
            <div className="absolute top-full right-0 mt-2 hidden group-hover:flex flex-col bg-white text-black shadow-md rounded-md min-w-[150px] z-50">
              {accountMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 hover:bg-blue-100 transition-colors text-sm"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <NavLink to="/yeu-thich" className="flex items-center gap-1 hover:text-gray-200">
            <FaHeart /> Yêu thích
          </NavLink>
          <NavLink to="/dat-lich-kham" className="flex items-center gap-1 hover:text-gray-200">
            <FaCalendarAlt /> Đặt khám
          </NavLink>
        </div>
      </div>

      {/* Logo + Tên + Hamburger (cùng hàng) */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
          <div className="leading-tight text-blue-700 text-lg font-bold md:text-2xl">
            <span className="block md:inline">Phòng khám đa khoa</span>{" "}
            <span className="text-black block">Sao Vàng</span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 font-medium text-base">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg hover:bg-blue-100 ${isActive ? "text-blue-600 font-semibold" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger - mobile only */}
        <button className="md:hidden text-xl text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-4 shadow-inner">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-blue-100 ${isActive ? "text-blue-600 font-semibold" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
