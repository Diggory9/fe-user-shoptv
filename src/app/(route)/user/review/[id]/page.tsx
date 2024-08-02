"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Rate, Space, Upload } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import ApiReview from "@/app/api/review/review";
import ApiProduct from "@/app/api/product/product";
import { ProductModel } from "@/models/product-model";
import { ReviewModel } from "@/models/review-model";
import MUploadImageMultiple from "@/components/ui/UploadImageMulti";
import Image from "next/image";

export default function Review({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [dataProduct, setDataProduct] = useState<ProductModel | null>(null);
    const [form] = Form.useForm();
    const auth = useAppSelector((state) => state.authCredentials);

    useEffect(() => {
        ApiProduct.getDetailProducts(params.id)
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.id]);

    const onFinish = async (values: ReviewModel) => {
        const finalValues = {
            ...values,
            productId: params.id,
            userId: auth.data?.id || "",
        };

        ApiReview.createReview(finalValues)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Đánh giá thành công");
                    router.push("/user/purchase");
                } else toast.error("Đánh giá thất bại");
            })
            .catch(() => toast.error("Đánh giá thất bại"));
    };

    return (
        <div>
            <button
                className="bg-white text-black px-4 py-2 rounded border mr-3 hover:bg-red-500 m-2"
                onClick={() => router.back()}
            >
                <ArrowLeftOutlined />
            </button>
            <h1 className="text-2xl font-bold pl-5">Đánh giá sản phẩm</h1>
            <div key={dataProduct?.id} className="mt-6  p-4  ">
                <div className="flex justify-between items-center ">
                    <div className="flex items-center ml-10">
                        <Image
                            width={50}
                            height={50}
                            src={dataProduct?.image || ""}
                            alt={dataProduct?.name || ""}
                            className="w-20 h-20 mr-4 border-2"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">
                                {dataProduct?.name}
                            </h2>
                            <h2> {dataProduct?.productBrand}</h2>
                        </div>
                    </div>
                </div>
                <Form
                    form={form}
                    name="validate_other"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="rating" label="Chất lượng ">
                        <Rate />
                    </Form.Item>

                    <MUploadImageMultiple
                        formName={["reviewImages"]}
                    ></MUploadImageMultiple>

                    <Form.Item name="content" label="Nhận xét">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Đánh giá
                            </Button>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
