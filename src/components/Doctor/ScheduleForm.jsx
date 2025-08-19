// components/ScheduleForm.jsx
import { useState } from "react";

// Nhãn ngày trong tuần
export const weekdayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ScheduleForm = ({ schedule, setSchedule, onSubmit, submitText }) => {
  const getLabel = (day) => (day === "Sunday" ? "CN" : `Thứ ${weekdayLabels.indexOf(day) + 2}`);

  return (
    <div className="p-5 bg-white shadow-md rounded-md border mb-4">
      <h2 className="text-lg font-semibold mb-4">{submitText}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <select
          className="border p-2 rounded-md w-full"
          value={schedule.weekday || ""}
          onChange={(e) => setSchedule({ ...schedule, weekday: e.target.value })}
        >
          <option value="">Chọn ngày</option>
          {weekdayLabels.map((day) => (
            <option key={day} value={day}>
              {getLabel(day)}
            </option>
          ))}
        </select>

        <input
          type="time"
          className="border p-2 rounded-md w-full"
          value={schedule.startTime || ""}
          onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
        />

        <input
          type="time"
          className="border p-2 rounded-md w-full"
          value={schedule.endTime || ""}
          onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
        />
      </div>
      <button
        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition text-sm"
        onClick={onSubmit}
      >
        {submitText}
      </button>
    </div>
  );
};

export default ScheduleForm;
