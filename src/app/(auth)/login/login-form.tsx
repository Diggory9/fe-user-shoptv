"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setAuthData } from "@/redux/features/authSlice";
import { GoogleSignInButton } from "@/components/ui/auth-button";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import ApiAuth from "@/app/api/auth/auth";
import ApiCart from "@/app/api/cart/cart";
import { setDataCart } from "@/redux/features/cartSlice";
import { error } from "console";

import { useSession } from "next-auth/react"
export default function LoginForm() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useSearchParams();
    const { data: session, status } = useSession()
    const onFinish = (value: any) => {
        console.log(value);
        ApiAuth.authLogin({
            email: value.userNameOrEmail,
            password: value.password,
        }).then((res) => {
            res?.json().then((data) => {
                dispatch(setAuthData(data?.data));
                // console.log(data.data);
                ApiCart.getCartByUser(data?.data?.id)
                    .then((data) => {
                        // console.log(data);
                        dispatch(setDataCart(data?.data));
                        toast.success("Login successful!");

                        router.push(params.get("callbackUrl") || "/");
                    })
                    .catch(() => {
                        toast.error("Thông tin không hợp lệ!");
                    });
            });
        });
    };

    useEffect(() => {
        console.log(session)
        if (status === 'authenticated' && session?.idToken) {
            console.log('Session authenticated with Google');

            const loginExternalLogin = async () => {
                const response = await ApiAuth.authExternalLogin({ idToken: session.idToken, provider: 'google' });
                const data = response.data;
                dispatch(setAuthData(data));
                console.log(data);
                router.push(params.get("callbackUrl") || "/");
            }
            loginExternalLogin();

        }
    }, [session]);
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

                <Button type="primary" htmlType="submit" className="w-full">
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
