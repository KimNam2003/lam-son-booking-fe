import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";

export default function DoctorSchedule() {
  const { user } = useAuth();
  const doctorId = user?.roleId;

  const [schedules, setSchedules] = useState([]);
  const [services, setServices] = useState([]);
  const [slotsByScheduleService, setSlotsByScheduleService] = useState({});
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Tạo mảng 7 ngày tiếp theo
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  // Lấy schedule
  useEffect(() => {
    if (!doctorId) return;
    fetch(`http://localhost:3000/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setSchedules(Array.isArray(data.schedules) ? data.schedules : []))
      .catch(console.error);
  }, [doctorId]);

  // Lấy services
  useEffect(() => {
    if (!doctorId) return;
    fetch(`http://localhost:3000/services?doctorId=${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setServices(list);
        if (list.length > 0) setSelectedServiceId(list[0].id);
      })
      .catch(console.error);
  }, [doctorId]);

  // Lấy slot
  useEffect(() => {
    if (!schedules.length || !services.length || !selectedDate) return;

    const fetchSlots = async () => {
      const newSlotsByScheduleService = {};
      for (const schedule of schedules) {
        newSlotsByScheduleService[schedule.id] = {};
        for (const service of services) {
          try {
            const res = await fetch(
              `http://localhost:3000/appointment-slots/by-date?scheduleId=${schedule.id}&serviceId=${service.id}&date=${selectedDate}`
            );
            const data = await res.json();
            newSlotsByScheduleService[schedule.id][service.id] = Array.isArray(data) ? data : [];
          } catch (err) {
            console.error(err);
            newSlotsByScheduleService[schedule.id][service.id] = [];
          }
        }
      }
      setSlotsByScheduleService(newSlotsByScheduleService);
    };

    fetchSlots();
  }, [schedules, services, selectedDate]);

  const slots = selectedServiceId
    ? schedules.flatMap((schedule) => slotsByScheduleService[schedule.id]?.[selectedServiceId] || [])
    : [];

  // Toggle trạng thái Active / Inactive
  const toggleSlotStatus = async (slot) => {
    const newStatus = !slot.isActive;
    try {
      const res = await fetch(`http://localhost:3000/appointment-slots/${slot.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      if (res.ok) {
        setSlotsByScheduleService((prev) => {
          const newState = { ...prev };
          for (const scheduleId in newState) {
            for (const serviceId in newState[scheduleId]) {
              newState[scheduleId][serviceId] = newState[scheduleId][serviceId].map((s) =>
                s.id === slot.id ? { ...s, isActive: newStatus } : s
              );
            }
          }
          return newState;
        });
      } else {
        alert("Cập nhật trạng thái thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lịch khám bác sĩ</h1>

      {/* Chọn ngày */}
      <div className="mb-4 flex items-center space-x-3">
        <label className="font-medium text-gray-700">Chọn ngày:</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {next7Days.map((day) => (
            <option key={day} value={day}>
              {new Date(day).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs dịch vụ */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedServiceId(service.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
              selectedServiceId === service.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Hiển thị slot từng dòng */}
      <div className="space-y-2">
        {slots.length ? (
          slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between p-3 bg-white border rounded shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">
                  {new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  {new Date(slot.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="text-sm text-gray-500">{slot.isBooked ? "Đã đặt" : "Chưa đặt"}</span>
              </div>
              <button
                onClick={() => toggleSlotStatus(slot)}
                className={`px-4 py-1 rounded-full font-semibold text-white transition ${
                  slot.isActive ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {slot.isActive ? "Active" : "Inactive"}
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-6 bg-gray-50 rounded">Không có slot</div>
        )}
      </div>
    </div>
  );
}
