"use client";
import { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useRouter } from "next/navigation";
import ApiAuth from "@/app/api/auth/auth";
import { ProvinceModel, DistrictModel, WardModel } from "@/models/ghn-model";
import { InfoModel } from "@/models/info-model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ApiDHN } from "@/app/api/dhn/dhn";
import { signOut } from "next-auth/react";
import { removeAuth } from "@/redux/features/authSlice";
import { resetCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

export default function CheckOutPage() {
    const [dataProvince, setDataProvince] = useState<ProvinceModel[]>([]);
    const [dataDistrict, setDataDistrict] = useState<DistrictModel[]>([]);
    const [dataWard, setDataWard] = useState<WardModel[]>([]);
    const [form] = Form.useForm();
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const [info, setInfo] = useState<InfoModel | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!auth.isLogin) {
            router.push("/login?callbackUrl=/user/profile");
        }

        const fetchProvinces = async () => {
            try {
                const res = await ApiDHN.getProvinces();
                setDataProvince(res.data);
            } catch (err) {
                console.error("Error fetching provinces:", err);
            }
        };
        const fetchInfo = async () => {
            try {
                const res = await ApiAuth.authGetInfo({
                    userId: auth.data?.id || "",
                });
                setInfo(res.data);
                form.setFieldsValue({
                    ...res.data,
                    province: res.data.province,
                    district: res.data.district,
                    ward: res.data.ward,
                });
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };

        fetchProvinces();
        fetchInfo();
    }, [auth.isLogin, auth.data?.id]);

    const handleChoiceProvince = async (value: any) => {
        try {
            const res = await ApiDHN.getDistricts({ provinceId: value });
            setDataDistrict(res.data);
            form.setFieldsValue({ district: null, ward: null });
        } catch (err) {
            console.error("Error fetching districts:", err);
        }
    };

    const handleChoiceDistrict = async (value: any) => {
        try {
            const res = await ApiDHN.getWards({ districtId: value });
            setDataWard(res.data);
        } catch (err) {
            console.error("Error fetching wards:", err);
        }
    };

    const handleFinish = async (values: any) => {
        const selectedProvince = dataProvince.find(
            (item) => item.ProvinceID === values.province
        );
        const selectedDistrict = dataDistrict.find(
            (item) => item.DistrictID === values.district
        );
        const selectedWard = dataWard.find(
            (item) => item.WardCode === values.ward
        );
        const body = {
            id: auth?.data?.id || "",
            userName: values.userName,
            fullName: values.fullName,
            Phone: values.phone,
            address: values.address,
            province: selectedProvince?.ProvinceName || values.province,
            district: selectedDistrict?.DistrictName || values.district,
            ward: selectedWard?.WardName || values.ward,
            displayName: values.displayName,
        };
        console.log(body);
        ApiAuth.authUpdateInfo(body)
            .then((result) => {
                alert(
                    "Thông tin đã được cập nhật thành công. Bạn cần đăng xuất để đồng bộ dữ liệu."
                );
                signOut();
                dispatch(removeAuth());
                dispatch(resetCart());
                toast.success("Đăng xuất thành công!");
            })
            .catch((error) => {
                // console.error('Error updating user info:', error);

                form.setFields([
                    {
                        name: "userName",
                        errors: ["UserName đã được sử dụng"],
                    },
                ]);
            });
    };
    const provinceOptions = dataProvince.map((item) => ({
        value: item.ProvinceID,
        label: item.ProvinceName,
    }));

    const districtOptions = dataDistrict.map((item) => ({
        value: item.DistrictID,
        label: item.DistrictName,
    }));

    const wardOptions = dataWard.map((item) => ({
        value: item.WardCode,
        label: item.WardName,
    }));

    return auth.isLogin ? (
        <div className="container mx-auto px-4 py-8">
            <Form
                form={form}
                onFinish={handleFinish}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
            >
                <div className="flex flex-col md:flex-row mx-10 my-5 space-y-5 md:space-y-0 md:space-x-5">
                    <div className="w-full font-serif">
                        <h1 className="text-3xl font-semibold mb-4">
                            Cập nhật thông tin
                        </h1>
                        <div className="flex space-x-5">
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                className="w-1/2"
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản"
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Username!",
                                    },
                                    {
                                        min: 6,
                                        message:
                                            "Username phải lớn hơn hoặc bằng 6 ký tự",
                                    },
                                ]}
                                className="w-1/2"
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>
                        </div>
                        <div className="flex space-x-5">
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại!",
                                    },
                                    {
                                        pattern: /^0[3|5|7|8|9][0-9]{8}$/,
                                        message: "Số điện thoại không hợp lệ!",
                                    },
                                ]}
                                className="w-1/2"
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                label="Tên hiển thị"
                                name="displayName"
                                className="w-1/2"
                            >
                                <Input placeholder="Nhập tên hiển thị" />
                            </Form.Item>
                        </div>
                        <div className="flex space-x-5">
                            <Form.Item
                                label="Tỉnh/Thành Phố"
                                name="province"
                                className="w-1/2"
                            >
                                <Select
                                    placeholder="Tỉnh/Thành Phố"
                                    onChange={handleChoiceProvince}
                                    options={provinceOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Quận/Huyện"
                                name="district"
                                className="w-1/2"
                            >
                                <Select
                                    placeholder="Quận/Huyện"
                                    onChange={handleChoiceDistrict}
                                    options={districtOptions}
                                />
                            </Form.Item>
                        </div>
                        <div className="flex space-x-5">
                            <Form.Item
                                label="Phường/Xã"
                                name="ward"
                                className="w-1/2"
                            >
                                <Select
                                    placeholder="Phường/Xã"
                                    options={wardOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                className="w-1/2"
                            >
                                <Input required placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="primary" htmlType="submit">
                        Cập nhật thông tin
                    </Button>
                </div>
            </Form>
        </div>
    ) : null;
}

function getValueBeforeSpace(str: string) {
    const parts = str.split(" ");
    return parts.shift();
}
