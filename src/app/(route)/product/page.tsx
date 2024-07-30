"use client";

import ApiProduct from "@/app/api/product/product";
import CardProduct from "@/components/ui/card-product";
import CategoryMenu from "@/components/ui/category-menu";
import FilterPrice from "@/components/ui/filter-price";
import { Products } from "@/components/ui/products";
import { ProductModel } from "@/models/product-model";
import { Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";

export default function CProduct() {
    const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCategory, setShowCategory] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalProduct, setTotalProduct] = useState(1);

    const onChange: PaginationProps["onChange"] = (page) => {
        setPageNumber(page);
    };

    useEffect(() => {
        fetchProducts();
    }, [pageNumber, pageSize]);

    const handleFilterChange = (filteredProducts: ProductModel[]) => {
        setDataProduct(filteredProducts);
    };

    const fetchProducts = () => {
        setLoading(true);
        ApiProduct.getProductPublished({
            pageNumber: pageNumber,
            pageSize: pageSize,
        })
            .then((res) => {
                setDataProduct(res.data);
                setTotalProduct(res.total);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleOnSelectCategory = (value: string) => {
        setLoading(true);
        if (value === "All") {
            ApiProduct.getProductPublished({
                pageNumber: pageNumber,
                pageSize: pageSize,
            })
                .then((res) => {
                    setDataProduct(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        } else {
            setPageNumber(1);
            ApiProduct.getProductPublicByCategory({
                id: value,
                pageNumber: pageNumber,
                pageSize: pageSize,
            })
                .then((res) => {
                    setDataProduct(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    };

    return (
        <div>
            <div className="bg-white flex flex-col sm:flex-row w-full mx-5 mt-10">
                <div
                    className={`w-full ${
                        showCategory ? "block" : "hidden"
                    } sm:block sm:w-1/4 lg:w-1/6`}
                >
                    <CategoryMenu
                        onSelectCategory={handleOnSelectCategory}
                        selectedCategory={selectedCategory}
                    />
                    <FilterPrice
                        onFilterChange={handleFilterChange}
                        setLoading={setLoading}
                    />
                </div>
                <div
                    className={`w-full ${
                        showCategory ? "" : "sm:w-full"
                    } sm:w-3/4 lg:w-5/6 p-10 flex justify-center items-center`}
                >
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Products products={dataProduct} loading={loading} />
                    )}
                </div>
            </div>
            <div className="flex justify-center py-3">
                <Pagination
                    onChange={onChange}
                    defaultCurrent={1}
                    total={totalProduct}
                />
            </div>
        </div>
    );
}
