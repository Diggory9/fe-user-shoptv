"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    externalLogin,
    login,
    resetAuthStatus,
} from "@/redux/features/authSlice";
import { GoogleSignInButton } from "@/components/ui/auth-button";
import { getCart } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function LoginForm() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const [isLoggin, setIsLogin] = useState(false);
    const auth = useAppSelector((state) => state.authCredentials);
    const onFinish = (value: any) => {
        console.log(value);

        try {
            dispatch(
                login({
                    email: value.userNameOrEmail,
                    password: value?.password,
                })
            );
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    useEffect(() => {
        if (auth.status === "succeeded" && auth.isLogin) {
            toast.success("Login successful!");
            dispatch(resetAuthStatus());
            dispatch(getCart({ userId: auth.data?.id || "" }));
            router.push(params.get("callbackUrl") || "/");
        } else if (auth.status === "failed") {
            toast.error(`Tài khoản mật khẩu không chính xác`);
            dispatch(resetAuthStatus());
        }
    }, [status, router, params, auth, dispatch]);
    useEffect(() => {
        console.log(session);
        if (
            status === "authenticated" &&
            session?.idToken &&
            isLoggin == false
        ) {
            console.log("Session authenticated with Google");
            dispatch(
                externalLogin({ idToken: session.idToken, provider: "google" })
            );
            setIsLogin(true);
            redirect(params.get("callbackUrl") || "/");
        }
    }, [session, isLoggin]);
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
