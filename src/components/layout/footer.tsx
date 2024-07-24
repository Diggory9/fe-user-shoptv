// components/Footer.js
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="border p-4 md:p-8 lg:p-12 bg-gray-100">
            <div className="flex flex-col md:flex-row md:justify-around">
                <div className="w-full md:w-1/3 text-xl font-semibold text-center md:text-left mb-6 md:mb-0">
                    Về TV
                    <ul className="text-base mt-2">
                        <li className="py-1">Giới thiệu</li>
                        <li className="py-1">Liên hệ</li>
                        <li className="py-1">Blog</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 text-xl font-semibold text-center md:text-left mb-6 md:mb-0">
                    Hỗ trợ khách hàng
                    <ul className="text-base mt-2">
                        <li className="py-1">Câu hỏi thường gặp</li>
                        <li className="py-1">Hướng dẫn mua hàng</li>
                        <li className="py-1">Hướng dẫn thanh toán VNPAY</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 text-xl font-semibold text-center md:text-left">
                    Chính sách
                    <ul className="text-base mt-2">
                        <li className="py-1">Chính sách bảo hành</li>
                        <li className="py-1">Chính sách bảo hành</li>
                        <li className="py-1">Chính sách bảo hành</li>
                        <li className="py-1">Chính sách bảo hành</li>
                        <li className="py-1">Chính sách bảo hành</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
