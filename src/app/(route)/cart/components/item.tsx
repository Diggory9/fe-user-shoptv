/* eslint-disable @next/next/no-img-element */

"use client";
import InputQuantity from "@/components/ui/input-quantity";
import {
    handlePriceBeforeDiscount,
    numberFormatLocationVietNam,
} from "@/helpers/helper";
import { CartModel } from "@/models/cart-model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import ApiCart from "@/app/api/cart/cart";
import { setDataCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

export default function CartItem({ cartItem }: { cartItem: CartModel }) {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.authCredentials);

    const [quantity, setQuantity] = useState<number>(cartItem.quantity);

    const handleQuantityChange = useCallback(debounce((newQuantity) => {

        ApiCart.addProductToCart(auth?.data?.id || '', cartItem?.id || '', null, newQuantity).then((data) => {
            dispatch(setDataCart(data.data));

        }).catch(() => {
            toast.error("Cập nhật sản phẩm thất bại");
        });
    }, 1000), []);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            handleQuantityChange(newQuantity);
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < cartItem?.quantityInStock) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            handleQuantityChange(newQuantity);
        }
    };

    const handleUpdateQuantity = (value: number) => {
        if (value > cartItem?.quantityInStock || value < 0) {
            return;
        }
        const quantityChange = value - quantity;
        console.log(quantityChange)
        setQuantity(value);
        handleQuantityChange(quantityChange);
    };
    const handleRemoveItem = async (itemId?: string) => {
        try {
            ApiCart.deleteProductToCart({ userId: auth.data?.id || '', productItemId: itemId || '' }).then((data) => {
                dispatch(setDataCart(data.data));
            }).catch(() => {
                toast.error("Xóa sản phẩm thất bại");
            });
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    return (
        <>
            <div className="flex mx-10 my-15 py-4">
                <div className="w-1/4">
                    <img
                        src={cartItem.image?.url}
                        alt={cartItem.name}
                        className="w-full h-full"
                    />
                </div>
                <div>
                    <div className="flex-1 m-5">
                        <h2 className="text-2xl text-gray-700 font-serif">
                            {cartItem.name}
                        </h2>
                        <div className="flex cartItems-center mt-5">
                            <p className="text-sm text-gray-500">
                                <strong>Màu: </strong>&nbsp;
                                <span>{cartItem.color?.colorName}</span>
                            </p>
                            <div
                                className="rounded-full border-spacing-1 border-gray-600 w-6 h-6 mx-3"
                                style={{

                                    backgroundColor: cartItem.color?.colorCode || "transparent",

                                }}
                            ></div>
                        </div>
                        {cartItem.discount?.type ? (
                            <>
                                <p className="text-lg text-red-700">
                                    {numberFormatLocationVietNam(
                                        handlePriceBeforeDiscount({
                                            price: cartItem.price || 0,
                                            typeDiscout: cartItem.discount.type,

                                            valueDiscount: cartItem.discount.value || 0,

                                        })!
                                    )}
                                </p>
                                <p className="text-base line-through text-gray-700 mt-1">
                                    {numberFormatLocationVietNam(cartItem.price || 0)}
                                </p>
                            </>
                        ) : (
                            <p className="text-lg text-black mt-3">
                                {numberFormatLocationVietNam(cartItem.price || 0)}
                            </p>
                        )}
                        <p className="text-sm text-gray-500">
                            <strong>Số lượng còn lại: </strong>&nbsp;
                            <span>{cartItem.quantityInStock}</span>
                        </p>
                    </div>
                    <div className="ml-5">
                        <InputQuantity
                            className="w-full"
                            max={cartItem.quantityInStock || 1}
                            value={quantity}

                            onClickMinus={handleDecreaseQuantity}
                            onClickPlus={handleIncreaseQuantity}
                            onChange={(value) => handleUpdateQuantity(value as number)}


                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 mr-10">
                <button
                    onClick={() => handleRemoveItem(cartItem.id)}
                    className="flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-300 bg-white border-2 border-black-700 text-black-700 focus:shadow-outline hover:bg-slate-200"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </>
    );
}
