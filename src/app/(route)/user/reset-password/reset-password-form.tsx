'use client'
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export interface ResetPasswordModel {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ResetPasswordForm() {
    const [form] = Form.useForm();

    const onFinish = (values: ResetPasswordModel) => {
    };
    const validatePassword = (value: any) => {
        if (value && form.getFieldValue('newPassword') !== value) {
            return Promise.reject(new Error('The two passwords do not match!'));
        }
        return Promise.resolve();
    };

    return (
        <Form
            form={form}
            name="change_password"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please input your current password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    { validator: validatePassword }
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    );
};
