"use client";
import ApiProduct from "@/app/api/product/product";
import CardProduct from "@/components/ui/card-product";
import { ProductModel } from "@/models/product-model";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Search() {
    const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);
    const [showCategory, setShowCategory] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const searchParams = useSearchParams();
    useEffect(() => {
        ApiProduct.getProductPublished({
            pageNumber: pageNumber,
            pageSize: pageSize,
        })
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((error) => console.error(error));
    }, [pageNumber, pageSize]);
    useEffect(() => {
        ApiProduct.queryProduct({
            query: searchParams.get("query") || "",
            offset: 1,
            limit: 10,
        })
            .then((response) => {
                setDataProduct(response.data);
            })
            .catch((error) => console.error(error));
    }, [searchParams]);
    return (
        <Suspense fallback={<>Loading...</>}>
            <div className="bg-white flex flex-col sm:flex-row w-full mx-5 mt-10">
                <div
                    className={`w-full ${
                        showCategory ? "" : "sm:w-full"
                    } sm:w-3/4 lg:w-5/6 p-10`}
                >
                    <div className="text-2xl p-3">
                        Kết quả tìm kiếm:{" "}
                        <span className="font-bold">
                            {" "}
                            {searchParams.get("query") || ""}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {!dataProduct || dataProduct.length == 0
                            ? "Không có dữ liệu"
                            : dataProduct.map((product) => (
                                  <CardProduct
                                      key={product.id}
                                      product={product}
                                  />
                              ))}
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
