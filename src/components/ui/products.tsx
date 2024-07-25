import { ProductModel } from "@/models/product-model";
import CardProduct from "./card-product";
import { Skeleton, Spin } from "antd";

interface ProductsProps {
    products: ProductModel[];
    loading: boolean;
}

export function Products({ products, loading }: ProductsProps) {
    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} active />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {!products || products.length === 0
                        ? "Không có dữ liệu"
                        : products.map((product) => (
                              <CardProduct key={product.id} product={product} />
                          ))}
                </div>
            )}
        </div>
    );
}
