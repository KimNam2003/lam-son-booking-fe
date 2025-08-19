import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById } from "../../services/api/services.api";
import { getDoctorsByServiceId } from "../../services/api/doctor.api";
import { getSchedulesByDoctorId } from "../../services/api/schedules.api";

import ServiceInfo from "../../components/Service/ServiceInfo";
import DoctorCard from "../../components/Service/DoctorCard";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const serviceRes = await getServiceById(id);
        setService(serviceRes.data[0]);

        const doctorsRes = await getDoctorsByServiceId(id);
        const doctorList = Array.isArray(doctorsRes.data) ? doctorsRes.data : doctorsRes.data.data || [];

        const doctorsWithSchedules = await Promise.all(
          doctorList.map(async (doc) => {
            try {
              const scheduleRes = await getSchedulesByDoctorId(doc.id);
              return {
                ...doc,
                schedules: Array.isArray(scheduleRes.data) ? scheduleRes.data : scheduleRes.data.data || [],
              };
            } catch {
              return { ...doc, schedules: [] };
            }
          })
        );

        setDoctors(doctorsWithSchedules);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setService(null);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">⏳ Đang tải...</p>;
  if (!service) return <p className="text-center mt-10 text-red-500">❌ Không tìm thấy dịch vụ</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-cyan-700 mb-4">{service.name}</h1>
      <p className="text-gray-600 mb-6">{service.description}</p>

      <ServiceInfo service={service} />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-6">👨‍⚕️ Bác sĩ thực hiện</h2>
        {doctors.length > 0 ? (
          <div className="space-y-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có bác sĩ nào cho dịch vụ này.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
