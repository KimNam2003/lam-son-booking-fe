import { useState } from "react";

const DateDropdown = ({ selectedDate, onChange }) => {
  // Tạo mảng 7 ngày liên tiếp từ hôm nay
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }

  const weekdays = {
    0: "Chủ Nhật",
    1: "Thứ 2",
    2: "Thứ 3",
    3: "Thứ 4",
    4: "Thứ 5",
    5: "Thứ 6",
    6: "Thứ 7",
  };

  // Format ngày hiển thị: "Thứ X - ngày/tháng" (không cần số 0 ở đầu ngày/tháng)
  const formatDateDisplay = (date) => {
    const dayName = weekdays[date.getDay()];
    const d = date.getDate(); // không dùng padStart để bỏ số 0
    const m = date.getMonth() + 1; // tháng bắt đầu từ 0 nên +1
    return `${dayName} - ${d}/${m}`;
  };

  // Format giá trị option (value) chuẩn yyyy-mm-dd
  const formatDateValue = (date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
  };

  return (
    <select
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full max-w-xs"
    >
      <option value="">Chọn ngày khám</option>
      {days.map((date) => (
        <option key={date.toISOString()} value={formatDateValue(date)}>
          {formatDateDisplay(date)}
        </option>
      ))}
    </select>
  );
};

export default DateDropdown;
