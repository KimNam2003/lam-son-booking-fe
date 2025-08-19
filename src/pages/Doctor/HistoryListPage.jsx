import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

export default function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data } = await axios.get(`${BASE_URL}/medical-history`);
        setHistoryList(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!historyList.length) return <div className="p-6">Chưa có lịch sử khám nào.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lịch sử khám bệnh</h1>
      <div className="space-y-4">
        {historyList.map((history) => (
          <div
            key={history.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex justify-between"
          >
            <div>
              <p className="font-semibold">
                Bệnh nhân: <span className="font-normal">{history.patient.fullName}</span>
              </p>
              <p className="font-semibold">
                Ngày khám: <span className="font-normal">{new Date(history.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="font-semibold">
                Bác sĩ: <span className="font-normal">{history.slot.schedule.doctor.fullName}</span>
              </p>
              <p className="font-semibold">
                Dịch vụ: <span className="font-normal">{history.slot.service.name}</span>
              </p>
              <p className="font-semibold">
                Giá: <span className="font-normal">{Number(history.price).toLocaleString()}₫</span>
              </p>
              <p className="font-semibold">
                Trạng thái:{" "}
                <span
                  className={`font-normal ${history.status === "completed" ? "text-green-600" : "text-yellow-600"}`}
                >
                  {history.status === "completed" ? "Hoàn thành" : history.status}
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate(`/bac-si/lich-su/${history.id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
