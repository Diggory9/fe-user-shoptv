"use client";
import { useAppSelector } from "@/redux/hooks";

export default function Profile() {
    const auth = useAppSelector((state) => state.authCredentials);

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full ">
                <h1 className="text-2xl font-bold  mb-6">Thông tin cá nhân</h1>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Tên người dùng
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={auth?.data?.userName || ""}
                        readOnly
                        className="bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 "
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={auth?.data?.email || ""}
                        readOnly
                        className="bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 "
                    />
                </div>
            </div>
        </div>
    );
}
