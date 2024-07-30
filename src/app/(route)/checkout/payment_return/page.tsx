"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Result, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ApiCheckout } from "@/app/api/checkout/checkout";
import { OrderInfo } from "@/models/order-info-model";
import { resetCart } from "@/redux/features/cartSlice";
import { formatDate, numberFormatLocationVietNam } from "@/helpers/helper";
import Link from "next/link";
//import { getCart} from '@/redux/features/cartSlice';

export default function CheckoutReturn() {
    // const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const fetchInitiated = useRef(false);
    const [order, setOrder] = useState<OrderInfo | null>(null);
    const [statusOrder, setStatusOrder] = useState<
        "success" | "error" | "warning"
    >("success");
    useEffect(() => {
        if (fetchInitiated.current) return;
        fetchInitiated.current = true;
        const savePaymentData = async () => {
            const txnRef = searchParams.get("vnp_TxnRef");
            //dispatch(paymentVnpay({ txnRef: txnRef || '' }));
            ApiCheckout.createOrderVnpay(txnRef || "")
                .then((data) => {
                    setOrder(data.data);
                    setStatusOrder("success");
                    setStatusMessage("Thành công");
                    dispatch(resetCart());
                    console.log(order);
                    setLoading(false);
                })
                .catch(() => {
                    setStatusMessage(
                        "Có lỗi xãy ra trong quá trình tạo đơn hàng"
                    );
                    setStatusOrder("warning");
                });
        };

        if (searchParams.get("vnp_ResponseCode") === "00") {
            savePaymentData();
        } else {
            setLoading(false);
            setStatusMessage("Đang có lỗi trong quá trình giao dịch");
            setStatusOrder("error");
        }
    }, []);

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <Suspense fallback={<>Loading...</>}>
            <div>
                {statusOrder === "success" && (
                    <Result
                        status={"success"}
                        title={statusMessage}
                        subTitle={
                            <div>
                                <p>Mã giao dịch: {order?.id}</p>
                                <p>Người nhận: {order?.recipientName}</p>
                                <p>Số điện thoại người nhận: {order?.phone}</p>
                                <p>
                                    Số tiền:{" "}
                                    {numberFormatLocationVietNam(
                                        order?.total || 0
                                    )}
                                </p>
                                <p>Ngày: {formatDate(order?.dateCreate)}</p>
                                <p>
                                    Nếu có thắc mắc vui lòng liên hệ đến
                                    034421414 để giải đáp
                                </p>
                            </div>
                        }
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
                )}
                {statusOrder === "error" && (
                    <Result
                        status={"error"}
                        title={statusMessage}
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
                                href={"/cart"}
                                className="border-2 p-2 rounded-lg text-gray-950 hover:border-blue-400"
                                key="detail"
                            >
                                Mua lại
                            </Link>,
                        ]}
                    />
                )}
                {statusOrder === "warning" && (
                    <Result
                        status={"warning"}
                        title={statusMessage}
                        subTitle={
                            <div>
                                <p>
                                    Đơn hàng đang xãy ra lỗi xin vui lòng liên
                                    hệ đến để giải đáp thắc mắc
                                </p>
                                <p>
                                    Nếu có thắc mắc vui lòng liên hệ đến
                                    034421414 để giải đáp
                                </p>
                            </div>
                        }
                    />
                )}
            </div>
        </Suspense>
    );
}
