"use client";
import { OrderInfo } from "@/models/order-info-model";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
    const router = useRouter();
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
    const handleBackHome = () => {
        router.push("/");
    };
    return (
        <Result
            status="success"
            title="Đặt hàng thành công"
            subTitle={`Mã đơn hàng: ${dataOrder?.id || "Không có mã đơn hàng"
                }`}
            extra={[
                <Button type="primary" key="home" onClick={handleBackHome}>
                    Về trang chủ
                </Button>,
                <Button key="detail">Chi tiết đơn hàng hehe</Button>,
            ]}
        />
    );
}
