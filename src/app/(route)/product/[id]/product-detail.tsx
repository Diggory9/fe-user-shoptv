"use client";

import ProductTabsProps from "@/app/(route)/product/[id]/component/tabprop";
import ApiCart from "@/app/api/cart/cart";
import ApiProduct from "@/app/api/product/product";
import CImageGallery from "@/components/ui/image-gallery";
import InputQuantity from "@/components/ui/input-quantity";
import { numberFormatLocationVietNam } from "@/helpers/helper";
import { ProductModel } from "@/models/product-model";
import { setDataCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RelatedProducts from "./component/related-products";

export const DetailProduct = ({ id }: { id: string }) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    const [product, setProduct] = useState<ProductModel | null>(null);
    const [productItemId, setProductItemId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const cart = useAppSelector((state) => state.cartCredentials);
    useEffect(() => {
        ApiProduct.getDetailProducts(id).then((res) => {
            setProduct(res.data);
            setProductItemId(res.data.productItems[0].id);
            const productBeforeItemSelected = updateProductItemSelected(
                res.data,
                res.data.productItems[0].id
            );
            setProduct(productBeforeItemSelected!);
        });
    }, [id]);

    const updateProductItemSelected = (
        product: ProductModel,
        productItemId: string
    ) => {
        if (!productItemId || !product) return;

        // Tìm productItem trong product với productItemId
        const updatedProductItems = product.productItems?.map((item) =>
            item.id === productItemId
                ? { ...item, selected: true }
                : { ...item, selected: false }
        );
        return {
            ...product,
            productItems: updatedProductItems,
        };
    };
    const handleOnClickChangeColor = (productItemId?: string) => () => {
        if (!productItemId || !product) return;
        const productBeforeItemSelected = updateProductItemSelected(
            product,
            productItemId
        );
        setProduct(productBeforeItemSelected!);
        setProductItemId(productItemId);
        console.log(productItemId);
    };

    const handleAddToCart = () => {
        if (!product) return;
        if (!auth.isLogin) {
            toast.error("Bạn cần đăng nhập");
            router.push(`/login?callbackUrl=${pathname}`);
        } else {
            try {
                let productInCart = cart.data?.find((item) => {
                    return item.id === productItemId;
                });
                let quantityIncr = quantity;
                if (productInCart) {
                    quantityIncr += productInCart.quantity;
                }
                ApiCart.addProductToCart(
                    auth?.data?.id || "",
                    productItemId || "",
                    null,
                    quantityIncr
                ).then((data) => {
                    dispatch(setDataCart(data.data));
                    toast.success("Thêm vào giỏ hàng thành công");
                });
            } catch (error) {
                toast.error(
                    "Thêm vào giỏ hàng thất bại xin thử lại sau ít phút"
                );
            }
        }
    };

    const onChangeValue = (value: number) => {
        if (value < 1) {
            value = 1;
        }
        if (value >= (selectedProductItem?.quantity || 1)) {
            value = selectedProductItem?.quantity || 1;
        }
        setQuantity(value);
    };

    const selectedProductItem = product?.productItems?.find(
        (item) => item.selected
    );
    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2">
                        {product &&
                        product.productItems &&
                        product.productItems.length > 0 ? (
                            <>
                                <CImageGallery product={product} />
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {/* left info */}
                    <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10 ">
                        <h1 className="text-3xl text-gray-900 font-serif border-b">
                            {product && product?.name}
                        </h1>
                        <p className="mt-4 text-xl text-red-500 border-b">
                            {numberFormatLocationVietNam(product?.price || 0)}
                        </p>
                        <div className="mt-4 text-xl text-gray-900 border-b flex items-center">
                            Màu sắc: &nbsp;
                            {product?.productItems?.map((item) => (
                                <div className="ml-3" key={item.id}>
                                    <Button
                                        onClick={handleOnClickChangeColor(
                                            item?.id
                                        )}
                                        className="m-1"
                                        style={{
                                            backgroundColor:
                                                item.color?.colorCode ||
                                                "#ffffff",
                                        }}
                                    ></Button>
                                    <div className="text-sm font-extralight">
                                        {item.color?.colorName}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* product specification */}

                        {product &&
                            product?.productSpecifications &&
                            product?.productSpecifications.length > 0 &&
                            product.productSpecifications.map(
                                (specification) => {
                                    return (
                                        <div
                                            className="mt-4 text-xl text-gray-900 border-b pb-2"
                                            key={specification.id}
                                        >
                                            {specification.specType} &nbsp;
                                            <span className="text-base border p-1">
                                                {specification.specValue}
                                            </span>
                                        </div>
                                    );
                                }
                            )}
                        <p className="mt-4 text-black text-lg">
                            Danh mục: {product && product.category.name}
                        </p>
                        <div className="pt-4">
                            <div className="flex gap-4">
                                <div className="w-[120px]">
                                    <InputQuantity
                                        className="w-full"
                                        max={
                                            selectedProductItem?.quantity || 99
                                        }
                                        value={quantity}
                                        onClickMinus={() =>
                                            setQuantity(
                                                quantity == 1 ? 1 : quantity - 1
                                            )
                                        }
                                        onClickPlus={() =>
                                            setQuantity(
                                                quantity ==
                                                    selectedProductItem?.quantity
                                                    ? selectedProductItem?.quantity
                                                    : quantity + 1
                                            )
                                        }
                                        onChange={(value) =>
                                            onChangeValue(value as number)
                                        }
                                    />
                                </div>
                                <div className=" text-center">
                                    {product && (
                                        <p>{`Còn: ${selectedProductItem?.quantity} sản phẩm`}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="mt-6 bg-black text-white px-4 py-2 uppercase">
                            Mua ngay
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="mt-6 ml-5 bg-white text-black px-4 py-2 uppercase hover:bg-blue-300 border-2"
                        >
                            Thêm vào giỏ
                        </button>
                        <div dangerouslySetInnerHTML={{ __html: "" }}></div>
                    </div>
                </div>
                <div className="flex ">
                    <div className="w-full lg:flex lg:items-center lg:justify-between">
                        <ProductTabsProps
                            description={product?.description || ""}
                            productId={product?.id || ""}
                        />
                    </div>
                </div>
                <div className="w-4/5 py-12 mx-auto">
                    <h1 className="p-4 text-3xl text-center font-semibold">
                        Có thể bạn cũng thích
                    </h1>
                    <RelatedProducts productId={id || ""} />
                </div>
            </div>
        </div>
    );
};
