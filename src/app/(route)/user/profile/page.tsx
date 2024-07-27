/* eslint-disable @next/next/no-img-element */
"use client";
import ApiAuth from "@/app/api/auth/auth";
import { InfoModel } from "@/models/info-model";
import { useAppSelector } from "@/redux/hooks";
import { Form, Input, Select } from "antd";
import { Button } from "antd/es/radio";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {

    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const [info, setInfo] = useState<InfoModel | null>(null);
    useEffect(() => {
        if (!auth?.isLogin) {
            router.push('/login?callbackUrl=/user/profile');
        }
        const fetchInfo = async () => {
            await ApiAuth.authGetInfo({ userId: auth.data?.id || '' })
                .then((res) => {
                    setInfo(res.data);
                })
                .catch((err) => {
                    console.error("Error fetch :", err);
                });
        };
        fetchInfo();
    }, []);

    return (

        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
                <div className="w-full">
                    <div className="flex justify-between w-full" >
                        <h2 className="text-xl font-semibold text-gray-800 w-1/2"> Họ và tên: </h2>
                        <h2 className="text-xl font-semibold text-gray-800 w-1/2">{info?.fullName || "Chưa có thông tin"}</h2>
                    </div>
                    <div className="flex justify-between w-full" >
                        <h2 className="text-xl font-semibold text-gray-800  w-1/2"> Tên hiển thị: </h2>
                        <p className="text-xl font-semibold text-gray-800 w-1/2">{info?.displayName || "Chưa có thông tin"}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <h2 className="text-xl font-semibold text-gray-800  w-1/2">Tài khoản: </h2>
                        <p className="text-gray-600 w-1/2">{info?.userName}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <h2 className="text-xl font-semibold text-gray-800  w-1/2">Email: </h2>
                        <p className="text-gray-600 w-1/2">{info?.email}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <h2 className="text-xl font-semibold text-gray-800  w-1/2">Số điện thoại: </h2>
                        <p className="text-gray-600 w-1/2">{info?.phone || "Chưa thiết lập số điện thoại"}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <h3 className="text-lg font-semibold text-gray-800  w-1/2">Địa chỉ: </h3>
                        <p className="text-gray-600 mt-2 w-1/2">{`${info?.address} - ${info?.ward} - ${info?.district} - ${info?.province}` || "Chưa thiết lập địa chỉ"}</p>
                    </div>
                </div>
            </div>

        </div>

    );
}
