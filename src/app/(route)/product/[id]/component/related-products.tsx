import ApiProduct from "@/app/api/product/product";
import CardProduct from "@/components/ui/card-product";
import { ProductModel } from "@/models/product-model";
import { Carousel } from "antd";
import { error } from "console";
import { useEffect, useState } from "react";

export default function RelatedProducts({ productId }: { productId: string }) {
    const [relatedProducts, setRelatedProducts] = useState<ProductModel[]>([]);
    const [totalProduct, setTotalProduct] = useState(1);
    useEffect(() => {
        ApiProduct.getProductsOfTheSameCategory({
            id: productId,
            pageNumber: 1,
            pageSize: 10,
        })
            .then((res) => {
                setRelatedProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productId]);
    console.log(relatedProducts.length);

    return (
        <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {!relatedProducts || relatedProducts.length === 0
                ? null
                : relatedProducts.map((product) => (
                      <CardProduct key={product.id} product={product} />
                  ))}
        </div>
    );
}
