const weekdaysMap = {
  Monday: "Thứ 2",
  Tuesday: "Thứ 3",
  Wednesday: "Thứ 4",
  Thursday: "Thứ 5",
  Friday: "Thứ 6",
  Saturday: "Thứ 7",
  Sunday: "Chủ nhật",
};

const WeeklySchedule = ({ schedules }) => {
  if (!schedules || schedules.length === 0) {
    return <p className="text-gray-500 text-sm">Chưa có lịch khám.</p>;
  }

  return (
    <div className="space-y-2">
      {schedules.map((slot) => (
        <div
          key={slot.id}
          className="bg-blue-50 border border-blue-100 rounded px-3 py-2 text-center hover:bg-blue-100 cursor-pointer"
        >
          {weekdaysMap[slot.weekday]} — {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
        </div>
      ))}
    </div>
  );
};

export default WeeklySchedule;
