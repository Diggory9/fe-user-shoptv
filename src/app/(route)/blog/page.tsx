/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Avatar, List, Space } from "antd";
import ApiBlog from "@/app/api/blog/blog-api";
import { error } from "console";

export default function Blog() {
    const [dataBlogs, setDataBlogs] = useState<any>([]);
    useEffect(() => {
        ApiBlog.getAllBlog(1, 20)
            .then((res) => {
                setDataBlogs(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataBlogs);
    const truncateContent = (content: string, maxLength: number) => {
        const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
        if (plainTextContent.length > maxLength) {
            return plainTextContent.substring(0, maxLength) + "...";
        }
        return plainTextContent;
    };
    const data = dataBlogs.map((item: any) => ({
        href: "https://ant.design", // Update this if each blog has a specific link
        title: item.title,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${item.authorId}`, // Using authorId for unique avatar generation
        description: `${item.blogGroupName}`, // Displaying author and group information
        content: truncateContent(item.content, 80),
        blogImage: item.blogImage,
    }));
    return (
        <div className=" flex w-4/5">
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item key={item.title}>
                        <div
                            className=""
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <img
                                width={150}
                                alt="logo"
                                src={item.blogImage}
                                style={{ marginRight: 16 }}
                            />
                            <div style={{ flex: 1 }}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
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
