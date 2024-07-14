/* eslint-disable @next/next/no-img-element */
"use client";
import { Carousel } from "antd";
export default function BannerSlide({ listImage }: { listImage: string[] }) {
    return (
        <Carousel
            draggable
            autoplay
            autoplaySpeed={3000}
            arrows
            infinite={false}
        >
            {listImage.map((item, index) => (
                <div key={index} className="w-full h-1/3">
                    <img className="w-full" src={item} alt="banner" />
                </div>
            ))}
        </Carousel>
    );
}
