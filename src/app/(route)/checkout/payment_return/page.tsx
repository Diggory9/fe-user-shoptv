'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCart, resetCart } from '@/redux/features/cartSlice';
import { formattedDateTime } from '@/helpers/helper';
interface DataOrder {
    id: string,
    orderType: string,
    address: string,
    phone: string,
    recipientName: string,
    subTotal: number,
    total: number,
    totalDiscount: number,
    dateCreate: Date,
    notes: string
};
// pages/payment_return.js

const PaymentReturn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const [paymentData, setPaymentData] = useState<DataOrder | null>(null);
    const auth = useAppSelector((state) => state.auth);
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();
    const fetchInitiated = useRef(false);

    useEffect(() => {
        if (fetchInitiated.current) return;
        fetchInitiated.current = true;

        const savePaymentData = async () => {
            try {
                const txnRef = searchParams.get('vnp_TxnRef')
                console.log(txnRef);
                const response = await fetch(
                    `${process.env.API_URL}/Payment/create-order/${txnRef}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log(response);
                const data = await response.json();
                setPaymentData(data.data);
                setStatusMessage('Thanh toán thành công!');
                dispatch(resetCart());

            } catch (error) {
                setStatusMessage('Thanh toán thất bại!');
                console.error('Error saving payment data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (searchParams.get('vnp_ResponseCode') === '00') {
            savePaymentData();
        } else {
            setLoading(false);
        }
    }, [searchParams, dispatch, auth]);

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div>
            <h1>Kết quả thanh toán</h1>
            <Result
                status={searchParams.get('vnp_ResponseCode') === '00' ? 'success' : 'error'}
                title={statusMessage}
                subTitle={searchParams.get('vnp_ResponseCode') === '00' ? (
                    <div>
                        <p>Mã giao dịch: {paymentData?.id || ''}</p>
                        <p>Số tiền: {paymentData?.total}</p>
                        <p>Ngày: {formattedDateTime(paymentData?.dateCreate || new Date())}</p>
                    </div>
                ) : null}
            />
        </div>
    );
};

export default PaymentReturn;
