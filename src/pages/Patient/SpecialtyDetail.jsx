import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServicesBySpecialtyId } from "../../services/api/services.api";
const SpecialtyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specialty, setSpecialty] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Điều hướng đến trang hiển thị bác sĩ theo dịch vụ
  const handleBooking = (serviceId) => {
    navigate(`/dich-vu/${serviceId}/bac-si`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServicesBySpecialtyId(id);

        const servicesList = res.data || [];
        console.log(servicesList);

        setServices(servicesList);

        // Lấy specialty từ service đầu tiên (giả định tất cả cùng specialty)
        if (servicesList.length > 0) {
          setSpecialty(servicesList[0].specialty);
        } else {
          setSpecialty(null);
        }
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết chuyên khoa:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">⏳ Đang tải dữ liệu...</p>;
  if (!specialty) return <p className="text-center mt-10 text-red-500">❌ Không tìm thấy chuyên khoa</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-yellow-600 mb-2 text-center">Dịch vụ chuyên khoa: {specialty.name}</h2>
      <p className="text-center text-gray-600 mb-8">{specialty.description}</p>

      <div className="space-y-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6"
          >
            {/* LEFT - Thông tin chính */}
            <div className="md:w-3/5 space-y-4">
              <h3 className="text-xl font-bold text-cyan-700">{service.name}</h3>

              {service.image_url && (
                <img src={service.image_url} alt={service.name} className="w-full h-48 object-cover rounded-md" />
              )}

              <p className="text-gray-700">{service.description}</p>

              {service.benefit && (
                <p>
                  <span className="font-medium">🎯 Lợi ích:</span> {service.benefit}
                </p>
              )}

              {service.notes && (
                <p>
                  <span className="font-medium">📝 Ghi chú:</span> {service.notes}
                </p>
              )}

              <button
                onClick={() => handleBooking(service.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                🩺 Đặt lịch ngay
              </button>
            </div>

            {/* RIGHT - Chi tiết dịch vụ */}
            <div className="md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-semibold">💰 Giá khám:</span> {Number(service.price).toLocaleString()}₫
              </div>

              <div>
                <span className="font-semibold">⏱ Thời gian:</span> {service.duration_minutes} phút
              </div>

              {service.target_patient && (
                <div>
                  <span className="font-semibold">👤 Đối tượng phù hợp:</span> {service.target_patient}
                </div>
              )}

              {service.preparation && (
                <div>
                  <span className="font-semibold">🧳 Chuẩn bị trước khi đến:</span> {service.preparation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyDetail;
