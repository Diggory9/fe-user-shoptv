"use client";
import CProduct from "@/app/(route)/product/page";
import Category from "@/components/layout/category";
import Collection from "@/components/layout/collection";
import BannerSlide from "@/components/ui/banner-slide";
import ContactUs from "@/components/ui/contact-us";
import { Products } from "@/components/ui/products";
import { ProductModel } from "@/models/product-model";
import { Suspense, useEffect, useState } from "react";
import ApiProduct from "./api/product/product";
import Link from "next/link";
import { Spin } from "antd";
import ApiBanner from "./api/banner/api-banner";

export default function Home() {
    const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataBanners, setDataBanners] = useState<[]>([]);
    useEffect(() => {
        ApiBanner.getGroupBannersByName("home page")
            .then((res) => {
                setDataBanners(res.data.banners);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataBanners);
    useEffect(() => {
        setLoading(true);
        ApiProduct.getProductPublished({
            pageNumber: 1,
            pageSize: 8,
        })
            .then((res) => {
                setDataProduct(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const bannerImage = [
        "/img/banner4.png",
        "/img/banner2.png",
        // "/img/banner1.jpg",
    ];

    return (
        <>
            <BannerSlide listImage={dataBanners} />
            <Category />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sản phẩm mới{" "}
                        <Link
                            className="text-lg font-normal text-gray-600"
                            href={"/product"}
                        >
                            xem tất cả
                        </Link>
                    </h1>
                    <div className="mt-6 space-y-12 border-t pt-6 ">
                        <Products products={dataProduct} loading={loading} />
                    </div>
                </div>
            </div>
            <Collection />
            <ContactUs />
        </>
    );
}
