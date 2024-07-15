/* eslint-disable @next/next/no-img-element */

"use client";
import InputQuantity from "@/components/ui/input-quantity";
import {
    handlePriceBeforeDiscount,
    numberFormatLocationVietNam,
} from "@/helpers/helper";
import { CartModel } from "@/models/cart-model";
import { addToCart, deleteProductFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export default function CartItem({ cartItem }: { cartItem: CartModel }) {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.authCredentials);
    const [quantity, setQuantity] = useState<number>(cartItem.quantity || 0);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDecreaseQuantity = useCallback(
        debounce(() => {
            if (quantity > 1) {
                setQuantity((prev) => prev - 1);
                let payload = {
                    userId: auth?.data?.id || "",
                    productItem: cartItem?.id || "",
                    incr: -1,
                    quantity: null,
                };
                setIsUpdating(true);
                dispatch(addToCart(payload)).finally(() => {
                    setIsUpdating(false);
                });
            }
        }, 300),
        [quantity]
    );

    const handleIncreaseQuantity = useCallback(
        debounce(() => {
            if (quantity < cartItem?.quantityInStock) {
                setQuantity((prev) => prev + 1);
                let payload = {
                    userId: auth?.data?.id || "",
                    productItem: cartItem?.id || "",
                    incr: 1,
                    quantity: null,
                };
                setIsUpdating(true);
                dispatch(addToCart(payload)).finally(() => {
                    setIsUpdating(false);
                });
            }
        }, 300),
        [quantity]
    );

    const handleUpdateQuantity = useCallback(
        debounce((value: number) => {
            if (value > cartItem?.quantityInStock || 0 || value < 0) {
                return;
            }
            let quantityAfter = value - quantity;
            setQuantity(value);
            let payload = {
                userId: auth?.data?.id || "",
                productItem: cartItem?.id || "",
                quantity: quantityAfter,
            };
            setIsUpdating(true);
            dispatch(addToCart(payload)).finally(() => {
                setIsUpdating(false);
            });
        }, 300),
        [quantity]
    );

    const handleRemoveItem = async (itemId?: string) => {
        try {
            dispatch(
                deleteProductFromCart({
                    userId: auth?.data?.id || "",
                    productItemId: itemId || "",
                })
            );
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
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
                                    backgroundColor:
                                        cartItem.color?.colorCode ||
                                        "transparent",
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
                                            valueDiscount:
                                                cartItem.discount.value || 0,
                                        })!
                                    )}
                                </p>
                                <p className="text-base line-through text-gray-700 mt-1">
                                    {numberFormatLocationVietNam(
                                        cartItem.price || 0
                                    )}
                                </p>
                            </>
                        ) : (
                            <p className="text-lg text-black mt-3">
                                {numberFormatLocationVietNam(
                                    cartItem.price || 0
                                )}
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
                            onClickMinus={() => handleDecreaseQuantity()}
                            onClickPlus={() => handleIncreaseQuantity()}
                            onChange={(value) =>
                                handleUpdateQuantity(value as number)
                            }
                            disabled={isUpdating}
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
