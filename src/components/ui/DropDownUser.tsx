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
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { resetCart } from "@/redux/features/cartSlice";
import { signOut } from "next-auth/react";
import { resetCart } from "@/redux/features/cartSlice";
const CustomDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, error, isLogin, data } = useAppSelector(
        (state) => state.authCredentials
    );
    const auth = useAppSelector((state) => state.authCredentials);

    const handleOnClick = () => {
        if (isLogin) {
            const logoutParams = {
                email: data?.email || "",
            };
            dispatch(logout(logoutParams)).finally(() => {
                signOut().finally(() => {
                    dispatch(resetCart());
                    toast.success("Đăng xuất thành công!");
                }); // Gọi hàm signOut từ hook useGoogleLogout
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
                Account
            </AntDropdown.Button>
        </Space>
    );
};

export default CustomDropdown;
