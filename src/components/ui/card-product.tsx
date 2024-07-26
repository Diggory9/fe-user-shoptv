/* eslint-disable @next/next/no-img-element */

import { numberFormatLocationVietNam } from "@/helpers/helper";
import { ProductModel } from "@/models/product-model";
import { Rate } from "antd";
import Link from "next/link";
interface CardProductProps {
    product: ProductModel;
}

const CardProduct = ({ product }: CardProductProps) => {
    let price = product.price;
    let discountLabel = "";

    if (product.productDiscount?.type === "PERCENTAGE") {
        price =
            product.price! -
            product.price! * (product.productDiscount.value! / 100);
        discountLabel = `-${product.productDiscount.value}%`;
    } else if (product.productDiscount?.type === "FIX-AMOUNT") {
        price = product.price! - product.productDiscount.value!;
        discountLabel = `-${numberFormatLocationVietNam(
            product.productDiscount.value!
        )}`;
    }

    console.log(product);

    return (
        <div className="group border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                    />
                )}
                {discountLabel && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {discountLabel}
                    </span>
                )}
            </div>
            <p className="mt-4 text-black text-lg font-semibold border-t-2 border-gray-300">
                {product.name}
            </p>

            <div className="mt-2">
                {product.productDiscount ? (
                    <>
                        <span className="ml-2 text-lg text-red-500 font-medium">
                            {numberFormatLocationVietNam(price || 0)}
                        </span>
                        <span className="pl-3 text-base line-through text-gray-500">
                            {numberFormatLocationVietNam(product.price || 0)}
                        </span>
                    </>
                ) : (
                    <span className="text-lg font-extralight">
                        {numberFormatLocationVietNam(price || 0)}
                    </span>
                )}
            </div>
            <div className="mt-2">
                {product.rating ? (
                    <>
                        <Rate
                            className="mt-3"
                            allowHalf
                            disabled
                            defaultValue={product.rating.rate || 0}
                        />
                        <span className="text-lg font-extralight p-2">
                            ({product.rating.count || 0})
                        </span>
                    </>
                ) : (
                    <span className="text-lg font-extralight">
                        {numberFormatLocationVietNam(price || 0)}
                    </span>
                )}
            </div>
            <div>
                <Link href={`/product/${product.id}`}>
                    <button className="bg-transparent hover:bg-green-900 text-black-700 font-semibold hover:text-white py-2 px-4 mt-2 border border-green-900 hover:border-transparent rounded">
                        Xem Thêm
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default CardProduct;
