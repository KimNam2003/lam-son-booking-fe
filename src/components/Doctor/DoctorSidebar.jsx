import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CalendarIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/useAuth";

export default function DoctorSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState("");
  const { logout } = useAuth;

  // Menu items
  const menuItems = [
    { path: "/bac-si/trang-chu", label: "Trang chủ", icon: <HomeIcon className="h-5 w-5" /> },
    { path: "/bac-si/thoi-khoa-bieu", label: "Thời khóa biểu", icon: <CalendarDaysIcon className="h-5 w-5" /> },
    {
      path: "/bac-si/lich-hen",
      label: "Quản lý lịch hẹn",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
      submenu: [
        { path: "/bac-si/lich-hen/cho-xac-nhan", label: "Chờ xác nhận" },
        { path: "/bac-si/lich-hen/da-xac-nhan", label: "Danh sách lịch đã hẹn" },
      ],
    },
    { path: "/bac-si/lich-trinh", label: "Quản lý lịch trình", icon: <CalendarIcon className="h-5 w-5" /> },
    { path: "/bac-si/lich-su-kham", label: "Lịch sử khám", icon: <CalendarIcon className="h-5 w-5" /> },
    { path: "/bac-si/ngay-nghi", label: "Quản lý ngày nghỉ", icon: <Cog6ToothIcon className="h-5 w-5" /> },
    { path: "/bac-si/thong-tin-ca-nhan", label: "Thông tin cá nhân", icon: <UserIcon className="h-5 w-5" /> },
  ];
  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (!confirmed) return;

    logout(); // gọi context logout
    navigate("/dang-nhap"); // chuyển về login
  };

  return (
    <aside className={`${collapsed ? "w-20" : "w-64"} bg-white shadow-md flex flex-col transition-all duration-300`}>
      {/* Logo + Toggle */}
      <div className="p-4 border-b flex justify-between items-center">
        {!collapsed && <h2 className="text-xl font-bold text-indigo-600">Doctor</h2>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-200">
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map((item) => {
          // Kiểm tra parent có active không (khi submenu active hoặc path đúng)
          const isParentActive =
            item.submenu?.some((sub) => location.pathname.startsWith(sub.path)) || location.pathname === item.path;

          return (
            <div key={item.path}>
              {item.submenu ? (
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.path ? "" : item.path)}
                  className={`flex items-center gap-3 w-full px-4 py-2 rounded hover:bg-indigo-50 ${
                    isParentActive ? "bg-indigo-100 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-50 ${
                      isActive ? "bg-indigo-100 font-semibold" : ""
                    }`
                  }
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )}

              {/* Submenu */}
              {item.submenu && openSubmenu === item.path && !collapsed && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-4 py-1 rounded hover:bg-indigo-100 ${
                          isActive ? "bg-indigo-200 font-semibold" : "text-gray-700"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          {!collapsed && "Đăng xuất"}
        </button>
      </div>
    </aside>
  );
}
