/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteProductFromCart, resetCartStatus } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { handlePriceBeforeDiscount, numberFormatLocationVietNam } from "@/helpers/helper";
import InputQuantity from "@/components/ui/input-quantity";


export default function CartPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const cart = useAppSelector((state) => state.cartCredentials);
    const auth = useAppSelector((state) => state.authCredentials);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (cart?.status === "deleteSuccessed") {
            toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
            dispatch(resetCartStatus());
        }
    }, [cart?.status, dispatch]);

    const handleRemoveItem = async (itemId?: string) => {
        try {
            dispatch(deleteProductFromCart({ userId: auth?.data?.id || '', productItemId: itemId || "" }));
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };

    const handleContinueShopping = () => {
        router.push("/product");
    };

    const totalPrice = cart?.data?.reduce((total, item) => {
        let priceBeforeDiscount = handlePriceBeforeDiscount({ price: item.price || 0, typeDiscout: item.discount?.type || null, valueDiscount: item.discount?.value || null })!;
        return total + priceBeforeDiscount * (item.quantity || 1);
    }, 0);

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <Badge offset={[20, 0]} count={cart?.data?.length || 0} style={{ display: cart?.data?.length ? 'block' : 'none' }}>
                <h1 className="text-3xl font-semibold font-serif text-gray-700 mb-4">Giỏ hàng</h1>
            </Badge>

            {cart?.data?.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b-4 border-spacing-1 border-gray-700 pb-5">
                    <div className="md:col-span-2 border-2 border-spacing-1 border-gray-400 rounded-lg">
                        {cart?.data?.map((item) => (
                            <div key={item.id} className="flex justify-between py-4">
                                <div className="flex mx-10 my-15 py-4">
                                    <img src={item.image?.url} alt={item.name} className="w-1/4" />
                                    <div>
                                        <div className="flex-1 m-5">
                                            <h2 className="text-2xl text-gray-700 font-serif">{item.name}</h2>
                                            <div className="flex items-center mt-5">
                                                <p className="text-sm text-gray-500">
                                                    <strong>Màu: </strong>&nbsp;
                                                    <span>{item.color?.colorName}</span>
                                                </p>
                                                <div className="rounded-full border-spacing-1 border-gray-600 w-6 h-6 mx-3" style={{ backgroundColor: item.color?.colorCode || "transparent" }}></div>
                                            </div>
                                            {item.discount?.type ? (
                                                <>
                                                    <p className="text-lg text-red-700">{numberFormatLocationVietNam(handlePriceBeforeDiscount({ price: item.price || 0, typeDiscout: item.discount.type, valueDiscount: item.discount.value || 0 })!)}</p>
                                                    <p className="text-base line-through text-gray-700 mt-1">{numberFormatLocationVietNam(item.price || 0)}</p>
                                                </>
                                            ) : (
                                                <p className="text-lg text-black mt-3">{numberFormatLocationVietNam(item.price || 0)}</p>
                                            )}
                                        </div>
                                        <div className="ml-5">
                                            <InputQuantity
                                                className="w-full"
                                                max={item.quantity || 99}
                                                value={item.quantity}
                                                onClickMinus={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                                                onClickPlus={() => setQuantity(prev => prev < (item.quantity || 99) ? prev + 1 : prev)}
                                                onChange={(value) => setQuantity(value as number || 1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 mr-10">
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-center rounded-full w-6 h-6 transition-colors duration-300 bg-white border-2 border-black-700 text-black-700 focus:shadow-outline hover:bg-slate-200"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-100 p-4">
                        <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                        <div className="flex justify-between mb-2">
                            <span>Thành tiền: </span>
                            <span>{numberFormatLocationVietNam(totalPrice || 0)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Vận chuyển</span>
                            <span>Liên hệ phí vận chuyển sau</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Tổng cộng</span>
                            <span>{numberFormatLocationVietNam(totalPrice || 0)}</span>
                        </div>
                        <Button onClick={handleCheckout} type="primary" className="mt-4 w-full">Thanh toán</Button>
                    </div>
                </div>
            )}
            <Button onClick={handleContinueShopping} type="primary" className="mt-4 w-30 p-5 text-lg">
                <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Tiếp tục mua sắm
            </Button>
        </div>
    );
};
