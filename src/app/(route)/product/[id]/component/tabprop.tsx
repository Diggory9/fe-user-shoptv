import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import Review from "@/app/(route)/product/[id]/component/review";
import Desciption from "@/app/(route)/product/[id]/component/description";

const ProductTabsProps = ({ description, productId }: { description: string, productId: string }) => {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Mô tả",
            children: <Desciption description={description || 'Không có mô tả về sản phẩm này'} />,
        },
        {
            key: "2",
            label: "Đánh giá",
            children: (
                <Review
                    productId={productId || ""}
                />
            ),
        },
        // {
        //     key: "3",
        //     label: "Giao hàng",
        //     children: <Delivery />,
        // },
    ];
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </ConfigProvider>
        </>
    );
};

export default ProductTabsProps;
