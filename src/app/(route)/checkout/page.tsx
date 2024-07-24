/* eslint-disable @next/next/no-img-element */
"use client";
import { ApiCheckout } from "@/app/api/checkout/checkout";
import { ApiDHN } from "@/app/api/dhn/dhn";
import { DistrictModel, ProvinceModel, WardModel } from "@/models/ghn-model";
import { ReviewCheckoutModel } from "@/models/review-checkout-model";
import { Button, Form, Input, Radio, Select } from "antd";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { numberFormatLocationVietNam } from "@/helpers/helper";
import { resetCart } from "@/redux/features/cartSlice";

export default function CheckOutPage() {
    const [dataProvince, setDataProvince] = useState<ProvinceModel[]>([]);
    const [dataDistrict, setDataDistrict] = useState<DistrictModel[]>([]);
    const [dataWard, setDataWard] = useState<WardModel[]>([]);
    const [dataReview, setDataReview] = useState<ReviewCheckoutModel | null>(
        null
    );
    const [form] = Form.useForm();
    const router = useRouter();
    const cart = useAppSelector((state) => state.cartCredentials);
    const auth = useAppSelector((state) => state.authCredentials);

    useEffect(() => {
        const fetchProvinces = async () => {
            await ApiDHN.getProvinces()
                .then((res) => {
                    setDataProvince(res.data);
                })
                .catch((err) => {
                    console.error("Error fetch :", err);
                });
        };

        const fetchDataReview = async () => {
            const payload = {
                items: cart.data?.map((item) => {
                    return {
                        productItemId: item.id,
                        quantity: item.quantity,
                    };
                }),
            };
            console.log(payload);

            await ApiCheckout.reviewCart(payload).then((res) => {
                setDataReview(res?.data);
            });
        };

        fetchProvinces();
        fetchDataReview();
    }, []);
    const handleChoiceProvince = async (value: any) => {
        await ApiDHN.getDistricts({ provinceId: value })
            .then((res) => {
                setDataDistrict(res.data);
            })
            .catch((err) => {
                console.error("Error during fetch:", err);
            });
        form.setFieldValue("district", null);
        form.setFieldValue("ward", null);
    };
    const handleChoiceDistrict = async (value: any) => {
        await ApiDHN.getWards({ districtId: value })
            .then((res) => {
                setDataWard(res.data);
            })
            .catch((err) => {});
    };
    const provinceOptions = dataProvince?.map((item) => ({
        value: item?.ProvinceID,
        label: item?.ProvinceName,
    }));
    const districtOptions = dataDistrict?.map((item) => ({
        value: item?.DistrictID,
        label: item?.DistrictName,
    }));
    const wardOptions = dataWard?.map((item) => ({
        value: item?.WardCode,
        label: item?.WardName,
    }));
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
        const address = `${values.address}, ${selectedWard?.WardName}, ${selectedDistrict?.DistrictName}, ${selectedProvince?.ProvinceName}`;

        const payload = {
            ...values,
            address: address,
            orderType: "Online",
            total: dataReview?.total,
            subTotal: dataReview?.subTotal,
            totalDiscount: dataReview?.discountAmount,
            userId: auth.data?.id,
            items: dataReview?.reviewCheckoutItems.map((item) => ({
                productItemId: item.productItemId,
                quantity: item.quantity,
                price: item.price,
                amountDiscount: item.amountDiscount,
            })),
            transactions: [
                {
                    amount: dataReview?.total,
                    type: values.typePayment,
                    userId: auth.data?.id,
                    status: "PENDING",
                },
            ],
        };

        delete payload.district;
        delete payload.province;
        delete payload.ward;
        delete payload.typePayment;

        if (values.typePayment == "COD") {
            try {
                ApiCheckout.saveOrder(payload)
                    .then((response) => {
                        response.json().then((data) => {
                            localStorage.setItem(
                                "dataOrder",
                                JSON.stringify(data.data)
                            );
                            router.push("/checkout/result");
                        });
                    })
                    .catch((error) => {
                        console.error("Create order:", error);
                        toast.error(
                            "Đơn đặt hàng không thành công xin thử lại sau ít phút"
                        );
                    });
            } catch (error) {
                console.error("Create order:", error);
            }
        } else if (values.typePayment == "VNPAY") {
            try {
                await ApiCheckout.getUrlVnpay(payload)
                    .then((data) => {
                        window.open(data.url, "_self");
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(
                            "Đơn đặt hàng không thành công xin thử lại sau ít phút"
                        );
                    });
            } catch (error) {}
        }
    };

    return (
        <Suspense fallback={<>Loading...</>}>
            <div className="container mx-auto px-4 py-8">
                <Toaster position="top-right" richColors />
                <Form
                    form={form}
                    onFinish={handleFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ typePayment: "COD" }}
                    autoComplete="off"
                    requiredMark="optional"
                >
                    <div className="flex flex-col md:flex-row mx-10 my-5 space-y-5 md:space-y-0 md:space-x-5">
                        <div className="md:w-full xl:w-3/5 lg:w-3/5 2xl:w-3/5p-5 font-serif">
                            <h1 className="text-3xl font-semibold  mb-4">
                                Thông tin giao hàng
                            </h1>
                            <div className="flex space-x-5">
                                <Form.Item
                                    label="Tên người nhận"
                                    name="recipientName"
                                    className="w-1/2"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập tên người nhận",
                                        },
                                        {
                                            pattern: /^[a-zA-Z\s]+$/,
                                            message: "Tên không hợp lệ",
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: "100%" }}
                                        type="text"
                                        placeholder="Nhập họ và tên"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    className="w-1/2"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập số điện thoại",
                                        },
                                        {
                                            pattern: /^[0-9]{10}$/,
                                            message:
                                                "Số điện thoại không hợp lệ",
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: "100%" }}
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex space-x-5">
                                <Form.Item
                                    label="Tỉnh/Thành Phố"
                                    name="province"
                                    className="w-1/2"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng chọn Tỉnh/Thành Phố",
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder="Tỉnh/Thành Phố"
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(value) =>
                                            handleChoiceProvince(value)
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        virtual
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                                .toLowerCase()
                                                .localeCompare(
                                                    (
                                                        optionB?.label ?? ""
                                                    ).toLowerCase()
                                                )
                                        }
                                        options={provinceOptions}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quận/Huyện"
                                    name="district"
                                    className="w-1/2"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn Quận/Huyện",
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder="Quận/Huyện"
                                        showSearch
                                        virtual
                                        onChange={(value) =>
                                            handleChoiceDistrict(value)
                                        }
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                                .toLowerCase()
                                                .localeCompare(
                                                    (
                                                        optionB?.label ?? ""
                                                    ).toLowerCase()
                                                )
                                        }
                                        options={districtOptions}
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex space-x-5">
                                <Form.Item
                                    label="Phường/Xã"
                                    name="ward"
                                    className="w-1/2"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn Phường/Xã",
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder="Phường/Xã"
                                        optionFilterProp="children"
                                        virtual
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                                .toLowerCase()
                                                .localeCompare(
                                                    (
                                                        optionB?.label ?? ""
                                                    ).toLowerCase()
                                                )
                                        }
                                        options={wardOptions}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="w-1/2"
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập địa chỉ",
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: "100%" }}
                                        type="text"
                                        placeholder="Địa chỉ"
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item label="Chú thích" name="notes">
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Ghi chú"
                                />
                            </Form.Item>
                        </div>
                        <div className="md:w-full xl:w-2/5 lg:w-2/5 2xl:w-2/5  bg-white rounded-lg border-2 p-5 relative">
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Tóm tắt đơn hàng
                                </h2>
                                <div className="">
                                    <div className="flex flex-col space-y-4">
                                        {dataReview?.reviewCheckoutItems!.map(
                                            (item) => (
                                                <div
                                                    key={item.productItemId}
                                                    className="flex items-center space-x-4 py-4 border-b border-gray-200"
                                                >
                                                    <div className="w-1/3 overflow-hidden">
                                                        <img
                                                            src={
                                                                item.image &&
                                                                item.image
                                                            }
                                                            alt=""
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-semibold ">
                                                            {item?.productName}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            Số lượng:{" "}
                                                            {item.quantity}
                                                        </p>
                                                        {item.amountDiscount !==
                                                            0 && (
                                                            <p className="text-red-600">
                                                                Giảm giá:{" "}
                                                                {numberFormatLocationVietNam(
                                                                    item.amountDiscount
                                                                )}
                                                            </p>
                                                        )}
                                                        <p className="text-gray-600">
                                                            Giá:{" "}
                                                            {numberFormatLocationVietNam(
                                                                item.price
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <p className="mt-4 font-semibold flex justify-between">
                                        <span>Tổng cộng: </span>
                                        <span>
                                            &nbsp;
                                            {numberFormatLocationVietNam(
                                                dataReview?.subTotal || 0
                                            )}
                                        </span>
                                    </p>
                                    <p className="mt-4 font-semibold flex justify-between">
                                        <span>Giảm giá: </span>
                                        <span>
                                            &nbsp;
                                            {numberFormatLocationVietNam(
                                                dataReview?.discountAmount || 0
                                            )}
                                        </span>
                                    </p>
                                    <p className="mt-4 font-semibold flex justify-between">
                                        <span>Thành tiền: </span>
                                        <span>
                                            &nbsp;
                                            {numberFormatLocationVietNam(
                                                dataReview?.total || 0
                                            )}
                                        </span>
                                    </p>
                                    <p className="border-2 border-gray-600 my-5"></p>
                                    <div className="p-5 border-t-2 border-gray-300 ">
                                        <Form.Item
                                            name="typePayment"
                                            label="Phương thức thanh toán: "
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            labelAlign="left"
                                            className="w-full text-lg"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn phương thức thanh toán",
                                                },
                                            ]}
                                        >
                                            <Radio.Group className="w-full">
                                                <Radio.Button
                                                    style={{
                                                        width: "50%",
                                                        textAlign: "center",
                                                    }}
                                                    value="COD"
                                                >
                                                    COD
                                                </Radio.Button>
                                                <Radio.Button
                                                    style={{
                                                        width: "50%",
                                                        textAlign: "center",
                                                    }}
                                                    value="VNPAY"
                                                >
                                                    VnPay
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Button
                                            htmlType="submit"
                                            className="w-full"
                                        >
                                            Thanh toán
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </Suspense>
    );
}
