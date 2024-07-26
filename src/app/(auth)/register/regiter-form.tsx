"use client";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ApiAuth from "@/app/api/auth/auth";
import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import Link from "next/link";
import { validatePassword } from "@/helpers/helper";
import { log } from "console";

export default function RegisterForm() {
    const [form] = Form.useForm();

    const router = useRouter();

    const onFinish = async (value: any) => {
        try {
            const response = await ApiAuth.authRegister({
                email: value.email,
                password: value.password,
                userName: value.userName,
                confirmPassword: value.confirmPassword,
            });

            if (response.ok) {
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                const data = await response.json();
                const checkValue = getValueBeforeSpace(data.Message);
                if (checkValue === "Username") {
                    form.setFields([
                        {
                            name: "userName",
                            errors: ["UserName đã tồn tại"],
                        },
                    ]);
                }

                if (checkValue === "Email") {
                    form.setFields([
                        {
                            name: "email",
                            errors: ["Email đã tồn tại"],
                        },
                    ]);
                }
            }
        } catch (error) { }
    };
    return (
        <Form
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="userName"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                    {
                        min: 6,
                        message: "Username phải lớn hơn hoặc bằng 6 ký tự",
                    },
                ]}
            >
                <Input
                    allowClear
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập email!",
                    },
                    {
                        type: "email",
                        message: "E-mail không hợp lệ!",
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    // {
                    //     required: true,
                    //     message: "Please input your Password!",
                    // },
                    {
                        validator: validatePassword,
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("Mật khẩu không trùng khớp!")
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="ConfirmPassword"
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                style={{ backgroundColor: "#14452f", borderColor: "#0A5C56" }}
            >
                Đăng ký
            </Button>
            <div className="pt-3">
                Nếu có tài khoản{" "}
                <Link className="font-bold" href="/login">
                    Đăng nhập
                </Link>
            </div>
        </Form>
    );
}
function getValueBeforeSpace(str: string) {
    const parts = str.split(" ");
    return parts.shift();
}
