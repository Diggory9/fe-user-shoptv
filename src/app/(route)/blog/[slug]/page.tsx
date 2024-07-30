/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { List } from "antd";
import ApiBlog from "@/app/api/blog/blog-api";
import { truncateContent } from "@/helpers/helper";

export default function DetailGroupBlog({
    params,
}: {
    params: { slug: string };
}) {
    const [dataGroupBlog, setDataGroupBlog] = useState<any>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalBlog, setTotalBlog] = useState(1);

    // Lấy data theo từng nhóm blog
    useEffect(() => {
        ApiBlog.getBlogByGroupId(params.slug, pageNumber, pageSize)
            .then((res) => {
                setDataGroupBlog(res.data);
                setTotalBlog(res.count);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.slug, pageNumber, pageSize]);

    // Custom data đổ vào list
    const data = dataGroupBlog?.map((item: any) => ({
        href: `/blog/${item.blogGroupName}/${item.id}`,
        title: item.title,
        description: `${item.blogGroupName}`,
        content: truncateContent(item.content, 80),
        blogImage: item.blogImage,
    }));

    //Lấy tên group blog để render
    const blogGroupName = data.length > 0 ? data[0].description : "";
    return (
        <div className="">
            <h1 className="text-3xl pl-3 uppercase ">{blogGroupName}</h1>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onShowSizeChange: (current, size) => {
                        setPageSize(current);
                        setPageNumber(1); // Reset to first page
                    },
                    defaultCurrent: 1,
                    onChange: (page) => {
                        setPageNumber(page);
                    },
                    pageSize: pageSize,
                    total: totalBlog,
                }}
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item key={item.title}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <img
                                className="transition-transform duration-300 transform hover:scale-105"
                                width={150}
                                height={200}
                                alt="logo"
                                src={item.blogImage}
                                style={{ marginRight: 16 }}
                            />
                            <div style={{ flex: 1 }}>
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}
                                />
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}
