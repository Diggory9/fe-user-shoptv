"use client";
import React from "react";
import {
    SkinOutlined,
    SolutionOutlined,
    TruckOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import Link from "next/link";

export default function NavUser() {
    type MenuItem = GetProp<MenuProps, "items">[number];

    const items: MenuItem[] = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: <Link href={"/user/profile"}>Thông tin cá nhân</Link>,
        },
        {
            key: "2",
            icon: <SolutionOutlined />,
            label: <Link href={"/user/purchase"}>Đơn hàng</Link>,
        },
    ];

    return (
        <>
            <Menu style={{ width: 256 }} items={items} />
        </>
    );
}
