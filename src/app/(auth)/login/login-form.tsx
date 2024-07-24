"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    externalLogin,
    login,
    resetAuthStatus,
    setAuthData,
} from "@/redux/features/authSlice";
import { GoogleSignInButton } from "@/components/ui/auth-button";
import { useSession } from "next-auth/react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import ApiAuth from "@/app/api/auth/auth";
import ApiCart from "@/app/api/cart/cart";
import { setDataCart } from "@/redux/features/cartSlice";
export default function LoginForm() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const router = useRouter();
    const params = useSearchParams();

    const auth = useAppSelector((state) => state.authCredentials);
    const onFinish = (value: any) => {
        console.log(value);

        try {
            ApiAuth.authLogin({
                email: value.userNameOrEmail,
                password: value.password,
            }).then((data) => {
                dispatch(setAuthData(data.data));
                console.log(data.data);
                ApiCart.getCartByUser(data.data.id).then((data) => {
                    console.log(data);
                    dispatch(setDataCart(data.data));
                    toast.success("Login successful!");

                    router.push(params.get("callbackUrl") || "/");
                });
            });
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    return (
        <>
            <Form
                form={form}
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="userNameOrEmail"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <div className="flex">
                    <Form.Item>
                        <Link className="font-semibold" href="">
                            Quên mật khẩu?
                        </Link>
                    </Form.Item>
                </div>

                <Button type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
                <div className="pt-3">
                    Hoặc{" "}
                    <Link href="/register" className="font-bold">
                        Đăng ký ngay
                    </Link>
                </div>
            </Form>
            <GoogleSignInButton />
        </>
    );
}
