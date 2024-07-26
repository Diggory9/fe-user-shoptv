"use client";
import ApiAuth from "@/app/api/auth/auth";
import { useAppSelector } from "@/redux/hooks";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export interface ResetPasswordModel {
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export default function ResetPasswordForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const auth = useAppSelector((state) => state.authCredentials);
    // console.log(auth.data);

    const onFinish = async (values: ResetPasswordModel) => {
        // console.log(values);
        try {
            const response = await ApiAuth.authChangePassWord({
                email: auth?.data?.email || "",
                currentPassword: values.currentPassword || "",
                password: values.newPassword || "",
                confirmPassword: values.confirmPassword || "",
            });
            const data = await response.json();
            console.log(data);

            if (response.message === "reset password is success") {
                toast.success("Thành công");
            } else {
                toast.error("Thất bại");
            }
        } catch (error) {}
        // ApiAuth.authChangePassWord({
        //     email: auth?.data?.email || "",
        //     currentPassword: values.currentPassword || "",
        //     password: values.newPassword || "",
        //     confirmPassword: values.confirmPassword || "",
        // })
        //     .then((res) => {
        //         const value = res.j;
        //         console.log(value);

        //         if (res?.message === "reset password is success") {
        //             toast.success("Thành công");
        //         } else {
        //             toast.error("Thất bại");
        //         }
        //     })
        //     .catch((error) => console.log(error));
    };
    useEffect(() => {
        if (!auth?.isLogin) {
            router.push("/login?callbackUrl=/user/reset-password");
        }
        form.setFieldValue("UserName", auth.data?.userName);
    }, [auth.data?.userName, form]);

    return auth?.isLogin ? (
        <Form
            form={form}
            name="change_password"
            onFinish={onFinish}
            layout="vertical"
        >
            <Col span={6}>
                <Form.Item name="UserName" label="UserName">
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    rules={[
                        {
                            required: true,
                            message: "Please input your current password!",
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password!",
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                {/* <Toaster position="top-right" richColors></Toaster> */}

                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={["newPassword"]}
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password!",
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Thay đổi mật khẩu
                </Button>
            </Col>
        </Form>
    ) : null;
}
