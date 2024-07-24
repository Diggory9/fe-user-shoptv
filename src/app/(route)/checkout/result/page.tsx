"use client";
import { OrderInfo } from "@/models/order-info-model";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Success() {
    const dispatcher = useAppDispatch();
    const [dataOrder, setDataOrder] = useState<OrderInfo | null>(null);
    useEffect(() => {
        const dataLocal = localStorage.getItem("dataOrder");
        console.log(dataLocal);
        if (dataLocal) {
            setDataOrder(JSON.parse(dataLocal));
            localStorage.removeItem("dataOrder");
            dispatcher(resetCart());
        }
    }, []);

    return (
        <Suspense fallback={<>Loading...</>}>
            <Result
                status="success"
                title="Đặt hàng thành công"
                subTitle={`Mã đơn hàng: ${
                    dataOrder?.id || "Không có mã đơn hàng"
                }`}
                extra={[
                    <Link
                        href={"/"}
                        type=""
                        key="home"
                        className="border-2 p-2 rounded-lg text-gray-200 bg-blue-500"
                    >
                        Về trang chủ
                    </Link>,
                    <Link
                        href={"/user/purchase"}
                        className="border-2 p-2 rounded-lg text-gray-950 hover:border-blue-400"
                        key="detail"
                    >
                        Chi tiết đơn hàng
                    </Link>,
                ]}
            />
        </Suspense>
    );
}
