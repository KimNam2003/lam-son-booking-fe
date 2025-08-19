import React, { useEffect, useState } from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/useAuth";
import { getDoctorById, getDoctorById2 } from "../../services/api/doctor.api";
import { BASE_URL } from "../../constants/constant";

export default function DoctorHeader({ breadcrumb = ["Trang chủ", "Dashboard"], unreadNotifications = 0 }) {
  const { user } = useAuth(); // user.id = doctorId
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "doctor") return; // nếu không phải bác sĩ hoặc chưa load user => không gọi API

    getDoctorById2(user.roleId)
      .then((data) => {
        setDoctorInfo(data.data);
        console.log("data1", data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch doctor info:", err);
        setDoctorInfo(null);
      });
  }, [user]);

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
      {/* Breadcrumb */}
      <nav className="text-gray-600 text-sm flex items-center space-x-2">
        {breadcrumb.map((item, idx) => (
          <span key={idx} className="flex items-center">
            <span className="font-semibold text-gray-800">{item}</span>
            {idx < breadcrumb.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 mx-6 max-w-xs">
        <input
          type="search"
          placeholder="Tìm bệnh nhân, lịch hẹn hoặc hồ sơ khám"
          className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Icons + Avatar */}
      <div className="flex items-center space-x-6 text-gray-600">
        <button aria-label="Thông báo" className="relative hover:text-indigo-600">
          <BellIcon className="h-6 w-6" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
              {unreadNotifications}
            </span>
          )}
        </button>

        <button aria-label="Cài đặt" className="hover:text-indigo-600">
          <Cog6ToothIcon className="h-6 w-6" />
        </button>

        <img
          src={`${BASE_URL}${doctorInfo?.avatarUrl || "/default-avatar.png"}`}
          alt={doctorInfo?.name || "Bác sĩ"}
          className="h-10 w-10 rounded-full object-cover cursor-pointer"
          title={doctorInfo?.name || "Bác sĩ"}
        />
      </div>
    </header>
  );
}
