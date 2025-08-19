const ServiceInfo = ({ service }) => (
  <div className="grid md:grid-cols-2 gap-6 mb-8 text-sm text-gray-700 bg-white p-6 rounded-lg shadow">
    <div>
      <p>
        <strong>🕒 Thời gian:</strong> {service.duration_minutes} phút
      </p>
      <p>
        <strong>💰 Giá khám:</strong> {Number(service.price).toLocaleString()}₫
      </p>
    </div>
    <div>
      <p>
        <strong>🎯 Đối tượng:</strong> {service.target_patient}
      </p>
      <p>
        <strong>✅ Lợi ích:</strong> {service.benefit}
      </p>
    </div>
    <div>
      <p>
        <strong>🧳 Cần chuẩn bị:</strong> {service.preparation}
      </p>
    </div>
    <div>
      <p>
        <strong>📝 Ghi chú:</strong> {service.notes}
      </p>
    </div>
  </div>
);

export default ServiceInfo;
