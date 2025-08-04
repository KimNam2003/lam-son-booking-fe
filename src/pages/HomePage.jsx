import { FaUserMd, FaClock, FaHeadphones, FaHeart, FaCheck, FaMoneyBill } from "react-icons/fa";

// Dữ liệu lợi ích BookingCare
const whyChooseBookingCare = [
  {
    icon: <FaUserMd className="text-orange-500 text-4xl mb-3 mx-auto" />,
    title: "BÁC SĨ UY TÍN",
    desc: "Mạng lưới bác sĩ chuyên khoa giỏi đã/đang công tác tại các viện lớn hàng đầu, với thông tin đã xác thực.",
  },
  {
    icon: <FaCheck className="text-orange-500 text-4xl mb-3 mx-auto" />,
    title: "ĐÚNG NGƯỜI ĐÚNG BỆNH",
    desc: "Đầy đủ các chuyên khoa, thông tin bác sĩ chi tiết, dễ dàng lựa chọn phù hợp.",
  },
  {
    icon: <FaHeadphones className="text-orange-500 text-4xl mb-3 mx-auto" />,
    title: "HỖ TRỢ CHU ĐÁO",
    desc: "Hỗ trợ bệnh nhân trong suốt quá trình khám, trước - trong - sau khám.",
  },
  {
    icon: <FaClock className="text-orange-500 text-4xl mb-3 mx-auto" />,
    title: "ĐẶT LỊCH 24/7",
    desc: "Lịch khám bác sĩ hiển thị liên tục, đặt bất cứ lúc nào phù hợp.",
  },
  {
    icon: <FaMoneyBill className="text-orange-500 text-4xl mb-3 mx-auto" />,
    title: "MIỄN PHÍ ĐẶT LỊCH",
    desc: "Bạn không mất phí khi đặt khám qua nền tảng BookingCare.",
  },
  {
    icon: <FaHeart className="text-orange-500 text-4xl mb-3 mx-auto" />,
    title: "KHÁM LẠI MIỄN PHÍ",
    desc: "Không hài lòng sẽ được hỗ trợ khám lại miễn phí với bác sĩ khác.",
  },
];

const introQuestions = [
  "Gặp vấn đề về sức khỏe nhưng không biết đi khám ở đâu?",
  "Đã đi khám nhiều nơi, nhiều bác sĩ mà vẫn không khỏi?",
  "Liệu lịch khám của bác sĩ có phù hợp với thời gian của bạn?",
];

const HomePage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Banner */}
      <section className="relative h-[500px] md:h-[500px] overflow-hidden">
        <img src="/src/assets/background.jpg" alt="banner" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/40 flex flex-col-2 items-center justify-around text-white text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">BookingCare</h1>
            <p className="text-lg md:text-xl font-medium mb-2">NỀN TẢNG ĐẶT KHÁM CHUYÊN KHOA</p>
            <p>Giúp bệnh nhân dễ dàng lựa chọn bác sĩ phù hợp và đặt lịch nhanh chóng.</p>
          </div>
          <img src="/src/assets/background.jpg" className="h-100 w-100 object-cover rounded-xl" />
        </div>
      </section>

      {/* Các câu hỏi thường gặp */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Có phải bạn hoặc người thân đang…</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {introQuestions.map((q, i) => (
            <div key={i} className="bg-white shadow-xl rounded-xl p-6 text-gray-700 text-xl">
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* Lý do chọn BookingCare */}
      <section className="bg-gray-50 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Tại sao BookingCare lại giải quyết được vấn đề của bạn?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseBookingCare.map((item, i) => (
            <div key={i} className="bg-white shadow-xl rounded-xl p-6 text-center  hover:shadow-2xl transition">
              {item.icon}
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-auto text-white ">
        {/* Ảnh nền */}
        <img
          src="/src/assets/background.jpg"
          alt="Phòng khám Sao Vàng"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay màu tối để dễ đọc chữ */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Nội dung chính */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Video bên trái */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/iNYs7LMsDaI"
                title="Video phòng khám Sao Vàng"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Nội dung bên phải */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">Phòng Khám Đa Khoa Sao Vàng</h2>
            <p className="text-lg">
              Chúng tôi mang đến dịch vụ khám chữa bệnh chất lượng cao, kết hợp giữa y học hiện đại và sự tận tâm trong
              từng bước chăm sóc bệnh nhân.
            </p>

            <blockquote className="italic border-l-4 border-yellow-400 pl-4 text-sm md:text-base text-gray-200">
              “Chữa bệnh bằng chuyên môn – Chạm đến trái tim bằng sự thấu hiểu.”
            </blockquote>
            <blockquote className="italic border-l-4 border-yellow-400 pl-4 text-sm md:text-base text-gray-200">
              “Sức khỏe của bạn – Ưu tiên số một của chúng tôi.”
            </blockquote>

            <ul className="space-y-2 list-disc pl-5 marker:text-yellow-400 text-sm md:text-base">
              <li>Đội ngũ bác sĩ giàu kinh nghiệm, từng công tác tại các bệnh viện lớn.</li>
              <li>Trang thiết bị hiện đại, đạt chuẩn Bộ Y Tế.</li>
              <li>Đặt lịch nhanh chóng – không phải chờ đợi lâu.</li>
              <li>Chăm sóc hậu khám chu đáo và tận tình.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
