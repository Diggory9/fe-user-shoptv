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
        // <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //     <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        //         <Title level={3} className="mb-4">User Information</Title>
        //         <Form
        //             form={form}
        //             onFinish={handleFinish}
        //             labelCol={{ span: 24 }}
        //             wrapperCol={{ span: 24 }}
        //             initialValues={{ typePayment: "COD" }}
        //             autoComplete="off"
        //             requiredMark="optional"
        //         >
        //             <div className="flex flex-col md:flex-row mx-10 my-5 space-y-5 md:space-y-0 md:space-x-5">
        //                 <div className="md:w-full xl:w-3/5 lg:w-3/5 2xl:w-3/5p-5 font-serif">
        //                     <h1 className="text-3xl font-semibold  mb-4">
        //                         Thông tin giao hàng
        //                     </h1>
        //                     <div className="flex space-x-5">
        //                         <Form.Item
        //                             label="Tên người nhận"
        //                             name="recipientName"
        //                             className="w-1/2"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message:
        //                                         "Vui lòng nhập tên người nhận",
        //                                 },
        //                                 {
        //                                     pattern: /^[a-zA-Z\s]+$/,
        //                                     message: "Tên không hợp lệ",
        //                                 },
        //                             ]}
        //                         >
        //                             <Input
        //                                 style={{ width: "100%" }}
        //                                 type="text"
        //                                 placeholder="Nhập họ và tên"
        //                             />
        //                         </Form.Item>
        //                         <Form.Item
        //                             label="Số điện thoại"
        //                             name="phone"
        //                             className="w-1/2"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message:
        //                                         "Vui lòng nhập số điện thoại",
        //                                 },
        //                                 {
        //                                     pattern: /^[0-9]{10}$/,
        //                                     message:
        //                                         "Số điện thoại không hợp lệ",
        //                                 },
        //                             ]}
        //                         >
        //                             <Input
        //                                 style={{ width: "100%" }}
        //                                 type="text"
        //                                 placeholder="Nhập số điện thoại"
        //                             />
        //                         </Form.Item>
        //                     </div>
        //                     <div className="flex space-x-5">
        //                         <Form.Item
        //                             label="Tỉnh/Thành Phố"
        //                             name="province"
        //                             className="w-1/2"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message:
        //                                         "Vui lòng chọn Tỉnh/Thành Phố",
        //                                 },
        //                             ]}
        //                         >
        //                             <Select
        //                                 style={{ width: "100%" }}
        //                                 placeholder="Tỉnh/Thành Phố"
        //                                 showSearch
        //                                 optionFilterProp="children"
        //                                 onChange={(value) =>
        //                                     handleChoiceProvince(value)
        //                                 }
        //                                 filterOption={(input, option) =>
        //                                     (option?.label ?? "").includes(
        //                                         input
        //                                     )
        //                                 }
        //                                 virtual
        //                                 filterSort={(optionA, optionB) =>
        //                                     (optionA?.label ?? "")
        //                                         .toLowerCase()
        //                                         .localeCompare(
        //                                             (
        //                                                 optionB?.label ?? ""
        //                                             ).toLowerCase()
        //                                         )
        //                                 }
        //                                 options={provinceOptions}
        //                             />
        //                         </Form.Item>
        //                         <Form.Item
        //                             label="Quận/Huyện"
        //                             name="district"
        //                             className="w-1/2"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: "Vui lòng chọn Quận/Huyện",
        //                                 },
        //                             ]}
        //                         >
        //                             <Select
        //                                 style={{ width: "100%" }}
        //                                 placeholder="Quận/Huyện"
        //                                 showSearch
        //                                 virtual
        //                                 onChange={(value) =>
        //                                     handleChoiceDistrict(value)
        //                                 }
        //                                 optionFilterProp="children"
        //                                 filterOption={(input, option) =>
        //                                     (option?.label ?? "").includes(
        //                                         input
        //                                     )
        //                                 }
        //                                 filterSort={(optionA, optionB) =>
        //                                     (optionA?.label ?? "")
        //                                         .toLowerCase()
        //                                         .localeCompare(
        //                                             (
        //                                                 optionB?.label ?? ""
        //                                             ).toLowerCase()
        //                                         )
        //                                 }
        //                                 options={districtOptions}
        //                             />
        //                         </Form.Item>
        //                     </div>
        //                     <div className="flex space-x-5">
        //                         <Form.Item
        //                             label="Phường/Xã"
        //                             name="ward"
        //                             className="w-1/2"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: "Vui lòng chọn Phường/Xã",
        //                                 },
        //                             ]}
        //                         >
        //                             <Select
        //                                 style={{ width: "100%" }}
        //                                 placeholder="Phường/Xã"
        //                                 optionFilterProp="children"
        //                                 virtual
        //                                 filterOption={(input, option) =>
        //                                     (option?.label ?? "").includes(
        //                                         input
        //                                     )
        //                                 }
        //                                 filterSort={(optionA, optionB) =>
        //                                     (optionA?.label ?? "")
        //                                         .toLowerCase()
        //                                         .localeCompare(
        //                                             (
        //                                                 optionB?.label ?? ""
        //                                             ).toLowerCase()
        //                                         )
        //                                 }
        //                                 options={wardOptions}
        //                             />
        //                         </Form.Item>
        //                         <Form.Item
        //                             className="w-1/2"
        //                             label="Địa chỉ"
        //                             name="address"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: "Vui lòng nhập địa chỉ",
        //                                 },
        //                             ]}
        //                         >
        //                             <Input
        //                                 style={{ width: "100%" }}
        //                                 type="text"
        //                                 placeholder="Địa chỉ"
        //                             />
        //                         </Form.Item>
        //                     </div>

        //                     <Form.Item label="Chú thích" name="notes">
        //                         <Input.TextArea
        //                             rows={4}
        //                             placeholder="Ghi chú"
        //                         />
        //                     </Form.Item>
        //                 </div>
        //             </div>
        //         </Form>
        //     </div>
        // </div>
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
