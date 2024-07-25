"use client";

import ApiProduct from "@/app/api/product/product";
import CardProduct from "@/components/ui/card-product";
import CategoryMenu from "@/components/ui/category-menu";
import { ProductModel } from "@/models/product-model";
import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";

export default function CProduct() {
    const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);
    const onChange: PaginationProps["onChange"] = (page) => {
        setPageNumber(page);
        //console.log(page);
    };
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCategory, setShowCategory] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalProduct, setTotalProduct] = useState(1);
    useEffect(() => {
        ApiProduct.getProductPublished({
            pageNumber: pageNumber,
            pageSize: pageSize,
        })
            .then((res) => {
                setDataProduct(res.data);
                setTotalProduct(res.total);
            })
            .catch((error) => console.error(error));
    }, [totalProduct, pageNumber, pageSize]);
    console.log("TotalProduct:", totalProduct);

    const handleOnSelectCategory = (value: string) => {
        setPageNumber(1);
        if (value === "All") {
            ApiProduct.getProductPublished({
                pageNumber: pageNumber,
                pageSize: pageSize,
            })
                .then((res) => {
                    setDataProduct(res.data);
                })
                .catch((error) => console.error(error));
        } else {
            setPageNumber(1);
            ApiProduct.getProductPublicByCategory({
                id: value,
                pageNumber: pageNumber,
                pageSize: pageSize,
            })
                .then((res) => {
                    setDataProduct(res.data);
                })
                .catch((error) => console.error(error));
        }
    };
    return (
        <div>
            <div className="bg-white flex flex-col sm:flex-row w-full mx-5 mt-10">

                <div
                    className={`w-full ${showCategory ? "block" : "hidden"
                        } sm:block sm:w-1/4 lg:w-1/6`}
                >
                    <CategoryMenu
                        onSelectCategory={handleOnSelectCategory}
                        selectedCategory={selectedCategory}
                    />
                </div>
                <div
                    className={`w-full ${showCategory ? "" : "sm:w-full"
                        } sm:w-3/4 lg:w-5/6 p-10`}
                >
                    <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {!dataProduct || dataProduct.length == 0
                            ? "Khong co du lieu"
                            : dataProduct.map((product) => (
                                <CardProduct
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-3">
                <Pagination
                    // showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    onChange={onChange}
                    defaultCurrent={1}
                    total={totalProduct}
                />
            </div>
        </div>
    );
}
