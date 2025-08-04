import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const clinicMeta = {
  name: "Phòng khám Đa khoa Sao Vàng",
  company: "Công ty TNHH Y tế Sao Vàng",
  addressCT: "123 Nguyễn Văn Cừ, P. An Khánh, Q. Ninh Kiều, TP. Cần Thơ",
  addressHCM: "Tòa nhà H3, 384 Hoàng Diệu, P.6, Q.4, TP.HCM",
  phone: "0292 3778 888",
  email: "support@saovangclinic.vn",
  license: "Giấy phép hoạt động số: 0123/SYT-CT, cấp ngày 01/01/2020",
  hours: "(7h - 18h)",
};

const footerLinks = [
  { label: "Giới thiệu phòng khám", href: "/gioi-thieu" },
  { label: "Dịch vụ khám chữa bệnh", href: "/dich-vu" },
  { label: "Đội ngũ bác sĩ", href: "/bac-si" },
  { label: "Quy trình khám bệnh", href: "/quy-trinh" },
  { label: "Thông tin sức khỏe", href: "/kienthuc" },
  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Hỏi đáp thường gặp", href: "/faq" },
  { label: "Liên hệ - Hợp tác", href: "/lien-he" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1b1b1b] text-gray-300 text-sm pt-10 pb-6 px-6 md:px-12 lg:px-20 ">
      <div className="flex flex-col md:flex-row justify-evenly gap-4">
        {/* Thông tin phòng khám */}
        <div className="space-y-4 max-w-xl">
          <h2 className="font-bold text-lg text-white">{clinicMeta.company}</h2>
          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1" />
            {clinicMeta.addressCT}
          </p>
          <p>{clinicMeta.license}</p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt />
            <a href={`tel:${clinicMeta.phone}`} className="hover:underline">
              {clinicMeta.phone}
            </a>{" "}
            {clinicMeta.hours}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope />
            <a href={`mailto:${clinicMeta.email}`} className="hover:underline">
              {clinicMeta.email}
            </a>
          </p>

          <div>
            <h3 className="font-semibold mt-4 text-white">Văn phòng tại TP Hồ Chí Minh</h3>
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              {clinicMeta.addressHCM}
            </p>
          </div>
        </div>

        {/* Liên kết footer */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-2 mt-6 md:mt-0 text-white ">
          {footerLinks.map((link, idx) => (
            <NavLink key={idx} to={link.href} className="hover:underline">
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Dòng mô tả */}
      <div className="text-gray-400 text-xs text-center leading-relaxed mt-8 border-t border-gray-600 pt-4">
        <p>
          Website đặt lịch khám trực tuyến cho <strong>{clinicMeta.name}</strong>.
        </p>
        <p>Địa chỉ: {clinicMeta.addressCT}</p>
        <p>
          Điện thoại: {clinicMeta.phone} | Email: {clinicMeta.email}
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {clinicMeta.company}. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}
