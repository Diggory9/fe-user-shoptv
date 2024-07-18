/* eslint-disable @next/next/no-img-element */
// CartDrawer.tsx
import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";

import { toast } from "sonner";
import { handlePriceBeforeDiscount, numberFormatLocationVietNam } from "@/helpers/helper";
import ApiCart from "@/app/api/cart/cart";
import { setDataCart } from "@/redux/features/cartSlice";

type CartDrawerProps = {
    open: boolean;
    loading?: boolean;
    userId?: string;
    setOpen: (open: boolean) => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({
    open,
    loading = false,
    setOpen,
}) => {
    const auth = useAppSelector((state) => state.authCredentials);
    const cart = useAppSelector((state) => state.cartCredentials);
    const dispatch = useAppDispatch();

    // tính tiền giảm giá
    //console.log(cart);

    const totalPriceCart = () => {
        return cart?.data?.reduce((total, item) => {
            return total + item?.price! * item?.quantity!;
        }, 0);
    };

    const handleRemoveItem = (id: string) => {
        if (cart?.data) {
            ApiCart.deleteProductToCart({ userId: auth.data?.id || '', productItemId: id }).then((data) => {
                dispatch(setDataCart(data.data));
                toast.success("Xóa sản phẩm thành công");
            }).catch((error) => {
                toast.success("Xóa sản phẩm thất bại");
            });
        }
    };
    return (
        <Drawer
            closable
            destroyOnClose
            title={<p>Giỏ hàng</p>}
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
        >
            <div>
                {!cart?.data || cart.data.length === 0 ? (
                    <div>không có sản phẩm</div>
                ) : (
                    <>
                        {cart?.data.map((item) => (
                            <div
                                className="w-full flex my-5 border-b-2 pb-2 border-gray-700 border-spacing-1"
                                key={item.id}
                            >
                                <div className="w-1/4">
                                    <img src={item?.image?.url} alt="" />
                                </div>
                                <div className="w-3/4 flex justify-between items-center">
                                    <div>
                                        <div>{item?.name}</div>
                                        <div>
                                            {numberFormatLocationVietNam(
                                                handlePriceBeforeDiscount({
                                                    price: item.price || 0,
                                                    typeDiscout:
                                                        item.discount?.type ||
                                                        null,
                                                    valueDiscount:
                                                        item.discount?.value ||
                                                        null,
                                                }) || 0
                                            )}{" "}
                                            <span>x</span> {item?.quantity}
                                        </div>
                                    </div>
                                    <button
                                        className="rounded-full w-6 h-6 transition-colors duration-300 bg-white border-2 border-black-700 text-black-700 focus:shadow-outline hover:bg-slate-200"
                                        onClick={() =>
                                            handleRemoveItem(item?.id || "")
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center mt-4">
                            <div className="text-lg font-bold">
                                Tổng cộng:{" "}
                                {totalPriceCart()?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href={"/cart"}>
                                <Button
                                    type="primary"
                                    style={{
                                        marginBottom: 16,
                                        marginRight: 34,
                                    }}
                                >
                                    Xem giỏ hàng
                                </Button>
                            </Link>
                            <Link href={"/checkout"}>
                                <Button type="primary">Thanh toán</Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </Drawer>
    );
};

export default CartDrawer;
