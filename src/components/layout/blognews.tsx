import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ApiBlog from "@/app/api/blog/blog-api";
import { truncateContent } from "@/helpers/helper";

const Blognews = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        ApiBlog.getAllBlog(1, 5)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="border-2 p-3">
            <h2 className="text-center text-xl underline py-3">
                BÀI VIẾT MỚI NHẤT
            </h2>
            <ul>
                {data?.map((item: any) => (
                    <li
                        className="border-t pt-2"
                        key={item.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Link href={`/blog/${item.blogGroupName}/${item.id}`}>
                            <div className="flex hover:text-blue-500">
                                <Image
                                    className="transition-transform duration-300 transform hover:scale-105"
                                    src={item.blogImage}
                                    width={70}
                                    height={70}
                                    alt={item.title || "Blog Image"}
                                    style={{ marginRight: "10px" }}
                                />

                                <div>
                                    <h3>{truncateContent(item.title, 30)}</h3>
                                    <p>{item.blogGroupName}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Blognews;
