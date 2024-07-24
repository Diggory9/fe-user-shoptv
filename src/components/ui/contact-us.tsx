// pages/contact.js
import Head from "next/head";

export default function ContactUs() {
    return (
        <div
            style={{
                backgroundImage: "url(/img/hello.png)",
                backgroundSize: "100%",
            }}
            className=" bg-no-repeat overflow-x-hidden  flex h-screen w-screen items-center justify-end bg-gray-50 "
        >
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mr-52">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Bạn cần hỗ trợ
                </h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nội dung</label>
                        <textarea
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Your message"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Gửi
                    </button>
                </form>
            </div>
        </div>
    );
}
