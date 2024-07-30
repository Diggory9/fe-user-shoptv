"use client";
import { formatDate, numberFormatLocationVietNam } from "@/helpers/helper";
import { OrderInfo } from "@/models/order-info-model";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Success() {
    const dispatcher = useAppDispatch();
    const [order, setDataOrder] = useState<OrderInfo | null>(null);
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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Result
                    status="success"
                    title={<h2 className="text-4xl font-bold">Thành công</h2>}
                    subTitle={
                        <div className="text-left text-lg">
                            <p className="mb-2">
                                <span className="font-semibold">Mã giao dịch:</span> {order?.id}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Người nhận:</span> {order?.recipientName}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Số điện thoại người nhận:</span> {order?.phone}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Số tiền:</span> {numberFormatLocationVietNam(order?.total || 0)}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Ngày:</span> {formatDate(order?.dateCreate)}
                            </p>
                            <p className="mt-4 text-gray-600">
                                Nếu có thắc mắc vui lòng liên hệ đến <span className="font-semibold">034421414</span> để giải đáp.
                            </p>
                        </div>
                    }
                    extra={[
                        <Link
                            href="/"
                            key="home"
                            className="inline-block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Về trang chủ
                        </Link>,
                        <Link
                            href="/user/purchase"
                            key="detail"
                            className="inline-block w-full text-center mt-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Chi tiết đơn hàng
                        </Link>,
                    ]}
                />
            </div>
        </Suspense>

    );
}
