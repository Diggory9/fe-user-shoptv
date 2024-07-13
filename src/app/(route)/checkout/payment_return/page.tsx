'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCart, paymentVnpay } from '@/redux/features/cartSlice';

export default function CheckoutReturn() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const auth = useAppSelector((state) => state.authCredentials);
    const cart = useAppSelector((state) => state.cartCredentials);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const fetchInitiated = useRef(false);

    useEffect(() => {
        if (fetchInitiated.current) return;
        fetchInitiated.current = true;
        console.log(cart);

        const savePaymentData = async () => {
            const txnRef = searchParams.get('vnp_TxnRef');
            dispatch(paymentVnpay({ txnRef: txnRef || '' }));
        };

        if (searchParams.get('vnp_ResponseCode') === '00') {
            savePaymentData().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [searchParams, cart, dispatch]);

    useEffect(() => {
        if (cart && cart.statusOrder === 'succeeded' && cart.orderInfo) {
            setStatusMessage("Thanh toan thanh cong");
            dispatch(getCart({ userId: auth.data?.id || '' }))
        } else if (cart && cart.statusOrder === 'failed') {
            setStatusMessage("Thanh toan that bai");
        }
    }, []);

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
                        <p>Mã giao dịch: </p>
                        <p>Số tiền: </p>
                        <p>Ngày: </p>
                    </div>
                ) : null}
            />
        </div>
    );
};
