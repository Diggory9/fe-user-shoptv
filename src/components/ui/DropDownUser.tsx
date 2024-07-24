"use client";

import React from "react";
import {
    LogoutOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown as AntDropdown, Button, Space } from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, removeAuth } from "@/redux/features/authSlice";
import { toast } from "sonner";
import ApiAuth from "@/app/api/auth/auth";
import { resetCart } from "@/redux/features/cartSlice";
import { signOut } from "next-auth/react";

const CustomDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLogin, data } = useAppSelector((state) => state.authCredentials);

    const handleOnClick = () => {
        if (isLogin) {
            const logoutParams = {
                email: data?.email || "",
            };

            ApiAuth.authLogout(logoutParams)
                .then((data) => {
                    signOut();
                    dispatch(removeAuth());
                    dispatch(resetCart());
                    toast.success("Đăng xuất thành công!");
                })
                .catch((err) => {
                    toast.error("Đăng xuất thất bại");
                });
        } else {
            toast.error("Logout failed");
        }
    };

    const items: MenuProps["items"] = [
        {
            label: <Link href={"/user/profile"}>Thông tin</Link>,
            key: "1",
            icon: <UserOutlined />,
        },
        {
            label: <Link href={"/user/purchase"}>Đơn hàng</Link>,
            key: "2",
            icon: <SolutionOutlined />,
        },
        {
            label: (
                <Button onClick={handleOnClick} type="link" danger>
                    Đăng xuất
                </Button>
            ),
            key: "3",
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <Space wrap>
            <AntDropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<UserOutlined />}
            >
                {data?.userName}
            </AntDropdown.Button>
        </Space>
    );
};

export default CustomDropdown;
