/* eslint-disable @next/next/no-img-element */
"use client";
import CartItems from "@/app/(route)/cart/components/cart-items";
import SummaryCartOrder from "@/app/(route)/cart/components/summary-order";
import { handlePriceBeforeDiscount } from "@/helpers/helper";
import { resetCartStatus } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CartPageComponent() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cartCredentials);
    useEffect(() => {
        if (cart?.status === "deleteSuccessed") {
            dispatch(resetCartStatus());
        }
    }, [cart?.status]);

    // dưa vào item

    const totalPrice = cart?.data?.reduce((total, item) => {
        let priceBeforeDiscount = handlePriceBeforeDiscount({
            price: item.price || 0,
            typeDiscout: item.discount?.type || null,
            valueDiscount: item.discount?.value || null,
        })!;
        return total + priceBeforeDiscount * (item.quantity || 1);
    }, 0);

    const handleContinueShopping = () => {
        redirect("/product");
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <Badge
                offset={[20, 0]}
                count={cart?.data?.length || 0}
                style={{ display: cart?.data?.length ? "block" : "none" }}
            >
                <h1 className="text-3xl font-semibold font-serif text-gray-700 mb-4">
                    Giỏ hàng
                </h1>
            </Badge>
            {!cart || cart?.data?.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b-4 border-spacing-1 border-gray-700 pb-5">
                    <div className="md:col-span-2 border-2 border-spacing-1 border-gray-400 rounded-lg">
                        <CartItems cartItems={cart.data || []} />
                    </div>
                    <SummaryCartOrder totalPrice={totalPrice || 0} />
                </div>
            )}
            <Button
                onClick={handleContinueShopping}
                type="primary"
                className="mt-4 w-30 p-5 text-lg"
            >
                <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Tiếp tục mua sắm
            </Button>
        </div>
    );
}
