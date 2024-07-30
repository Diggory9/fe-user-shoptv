/* eslint-disable @next/next/no-img-element */
"use client";
import ApiBanner from "@/app/api/banner/api-banner";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
export default function BannerSlide({ listImage }: { listImage: string[] }) {
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

    return (
        <Carousel
            draggable
            autoplay
            autoplaySpeed={3000}
            arrows
            infinite={false}
        >
            {listImage.map((item: any, index) => (
                <div key={index} className="w-full h-1/3">
                    <img className="w-full" src={item.url} alt="banner" />
                </div>
            ))}
        </Carousel>
    );
}
