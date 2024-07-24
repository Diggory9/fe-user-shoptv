"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Result, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ApiCheckout } from "@/app/api/checkout/checkout";
import { OrderInfo } from "@/models/order-info-model";
import { resetCart } from "@/redux/features/cartSlice";
import { formatDate, numberFormatLocationVietNam } from "@/helpers/helper";
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
        <div>
            <h1>Kết quả thanh toán</h1>
            {statusOrder === "success" && (
                <Result
                    status={"success"}
                    title={statusMessage}
                    subTitle={
                        <div>
                            <p>Mã giao dịch: {order?.id}</p>
                            <p>
                                Số tiền:{" "}
                                {numberFormatLocationVietNam(order?.total || 0)}
                            </p>
                            <p>Ngày: {formatDate(order?.dateCreate)}</p>
                            <p>
                                Nếu có thắc mắc vui lòng liên hệ đến 034421414
                                để giải đáp
                            </p>
                        </div>
                    }
                />
            )}
            {statusOrder === "error" && (
                <Result
                    status={"error"}
                    title={statusMessage}
                    // subTitle={(
                    //     <div>
                    //         <p>Mã giao dịch: {order?.id}</p>
                    //         <p>Số tiền: {numberFormatLocationVietNam(order?.total || 0)}</p>
                    //         <p>Ngày: {formatDate(order?.dateCreate)}</p>
                    //         <p>Nếu có thắc mắc vui lòng liên hệ đến 034421414 để giải đáp</p>
                    //     </div>
                    // )}
                />
            )}
            {statusOrder === "warning" && (
                <Result
                    status={"warning"}
                    title={statusMessage}
                    subTitle={
                        <div>
                            <p>
                                Đơn hàng đang xãy ra lỗi xin vui lòng liên hệ
                                đến để giải đáp thắc mắc
                            </p>
                            <p>
                                Nếu có thắc mắc vui lòng liên hệ đến 034421414
                                để giải đáp
                            </p>
                        </div>
                    }
                />
            )}
        </div>
    );
}
