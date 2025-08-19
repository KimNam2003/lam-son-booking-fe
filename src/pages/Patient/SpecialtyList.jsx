import { useEffect, useState } from "react";
import SearchBox from "../../components/ui/SearchBox";
import { filterDataByKeyword } from "../../utils/searchHelper";
import { getSpecialties } from "../../services/api/specialties.api";
import { BASE_URL } from "../../constants/constant";
import { useNavigate } from "react-router-dom";

const SpecialtyList = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/chuyen-khoa/${id}/dich-vu`);
  };

  // Gọi API khi component mount
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await getSpecialties();
        setSpecialties(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chuyên khoa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Lọc danh sách chuyên khoa theo từ khóa

  const filteredSpecialties = Array.isArray(specialties) ? filterDataByKeyword(specialties, searchTerm) : [];

  if (loading) {
    return <p className="text-center mt-10">Đang tải chuyên khoa...</p>;
  }

  return (
    <div className="max-w-full mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6">Danh sách chuyên khoa</h2>

      {/* 🔍 Ô tìm kiếm - căn phải */}
      <div className="flex justify-end mb-4">
        <div className="w-full max-w-sm">
          <SearchBox value={searchTerm} onChange={setSearchTerm} name="chuyên khoa" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredSpecialties.length > 0 ? (
          filteredSpecialties.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer"
            >
              {item.imageUrl && (
                <img
                  src={`${BASE_URL}/${item.imageUrl}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              {item.description && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Không tìm thấy chuyên khoa nào.</p>
        )}
      </div>
    </div>
  );
};

export default SpecialtyList;
