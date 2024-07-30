"use client";
import ApiBlog from "@/app/api/blog/blog-api";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DetailBlog({ params }: { params: { id: string } }) {
    const [dataBlog, setDataBlog] = useState<any>([]);

    useEffect(() => {
        ApiBlog.getBlogById(params.id)
            .then((res) => {
                setDataBlog(res?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.id]);

    console.log(dataBlog);
    return (
        <div className="w-full pl-10">
            <Image
                src={dataBlog?.blogImage}
                width={900}
                height={500}
                alt={dataBlog?.title || "Blog Image"}
            />
            <h1 className="text-2xl py-2"> {dataBlog?.title}</h1>
            <div className="font-bold py-2 text-xl">
                {" "}
                {dataBlog?.blogGroupName}
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: dataBlog?.content,
                }}
            />
            <div className="py-4">Tags: {dataBlog?.tags}</div>
        </div>
    );
}
