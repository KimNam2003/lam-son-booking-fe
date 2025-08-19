import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaUser, FaHeart, FaCalendarAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Bạn chắc chắn muốn đăng xuất không?")) {
      logout();
      navigate("/dang-nhap");
    }
  };

  // Nav items, thêm "Lịch hẹn" nếu có user
  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Giới thiệu", path: "/gioi-thieu" },
    { label: "Chuyên khoa", path: "/chuyen-khoa" },
    { label: "Bác sĩ", path: "/bac-si" },
    { label: "Tin tức", path: "/tin-tuc" },
    ...(user ? [{ label: "Lịch hẹn", path: `/benh-nhan/${user.roleId}` }] : []),
    { label: "Lịch sử khám", path: "/lich-su-kham" },
    { label: "Liên hệ", path: "/lien-he" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-sm md:text-base px-4 md:px-10 py-2 flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:gap-6 gap-1">
          <span className="flex items-center gap-2">
            <FaPhoneAlt /> +84 965 176 102
          </span>
          <span className="flex items-center gap-2">
            <FaEnvelope /> namvlog2k3@gmail.com
          </span>
        </div>

        {/* Account actions */}
        <div className="flex items-center gap-4 text-sm relative">
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <FaUser /> {user.name || "Tôi"}
              </div>
              {accountMenuOpen && (
                <div className="absolute top-full right-0 mt-2 flex flex-col bg-white text-black shadow-md rounded-md min-w-[180px] z-50">
                  <NavLink
                    to="/thong-tin-ca-nhan"
                    className="px-4 py-2 hover:bg-blue-100 text-sm"
                    onClick={() => setAccountMenuOpen(false)}
                  >
                    Thông tin cá nhân
                  </NavLink>
                  <NavLink
                    to="/doi-mat-khau"
                    className="px-4 py-2 hover:bg-blue-100 text-sm"
                    onClick={() => setAccountMenuOpen(false)}
                  >
                    Đổi mật khẩu
                  </NavLink>
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-left px-4 py-2 hover:bg-blue-100 text-sm"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/dang-nhap" className="flex items-center gap-1 hover:text-gray-200">
              <FaUser /> Đăng nhập
            </NavLink>
          )}

          <NavLink to="/yeu-thich" className="flex items-center gap-1 hover:text-gray-200">
            <FaHeart /> Yêu thích
          </NavLink>
          <NavLink to="/chuyen-khoa" className="flex items-center gap-1 hover:text-gray-200">
            <FaCalendarAlt /> Đặt khám
          </NavLink>
        </div>
      </div>

      {/* Logo + Desktop nav + Hamburger */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
          <div className="leading-tight text-blue-700 text-lg font-bold md:text-2xl">
            <span className="block md:inline">Phòng khám đa khoa</span>{" "}
            <span className="text-black block">Lam Sơn</span>
          </div>
        </div>

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

        <button className="md:hidden text-xl text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-4 shadow-inner">
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
      )}
    </header>
  );
}
