// pages/contact.js
'use client'
import { apiContactUs } from "@/app/api/contact-us/contact-us";
import { Form, Input } from "antd";
import Head from "next/head";
import { toast, Toaster } from "sonner";

export default function ContactUs() {
    const [form] = Form.useForm();

    const handleFinish = async (values: any) => {

        var body = {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            contactContent: values.contactContent
        }
        console.log(body);
        apiContactUs.seenContact(body).then((res) => {


            if (res?.ok) {

                toast.success("Hệ thống đã tiếp nhận câu hỏi của bạn. Nhân viên hỗ trợ sẽ sớm liên hệ lại với bạn.");
            }
        }).catch((error) => {
            toast.success("Hệ thống đang gặp sự cố. Xin vui lòng thử lại sau ít phút");
        });


    }
    return (
        <div
            style={{
                backgroundImage: "url(/img/hello.png)",
                backgroundSize: "cover",
            }}
            className=" bg-no-repeat overflow-x-hidden w-full flex h-screen items-center justify-end bg-gray-50 "
        >
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="bg-white p-8 rounded-lg shadow-lg lg:w-1/2 md:w-full bg-opacity-20 mr-0 lg:mr-12 xl:mr-16 2xl:mr-20 border">

                <Toaster position="top-right" richColors />
                <Form
                    form={form}
                    onFinish={handleFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                >
                    <div className="flex flex-col md:flex-row mx-10 mt-5 space-y-5 md:space-y-0 md:space-x-5">
                        <div className="w-full font-serif">
                            <h2 className="text-3xl font-sans mb-4">  Bạn cần hỗ trợ</h2>
                            <div className="flex space-x-5">
                                <Form.Item label="Họ và tên" name="fullName" className="w-1/2" rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ tên",
                                    }]}>
                                    <Input placeholder="Nhập họ và tên" />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email",
                                    },
                                    {
                                        type: "email",
                                        message: "E-mail không hợp lệ!",
                                    },
                                ]} className="w-1/2">
                                    <Input placeholder="Nhập tên tài khoản" />

                                </Form.Item>
                            </div>
                            <div className="flex space-x-5">
                                <Form.Item label="Số điện thoại" name="phone" rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                    {
                                        pattern: /^0[3|5|7|8|9][0-9]{8}$/,
                                        message: 'Số điện thoại không hợp lệ!',
                                    },
                                ]} className="w-1/2">
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>

                                <Form.Item label="Nôi dung liên hệ" name="contactContent" className="w-1/2" rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập thông tin cần hỏi",
                                    }]}>
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Ghi chú"
                                    />
                                </Form.Item>

                            </div>


                        </div>

                    </div>
                    <div className="w-full flex justify-end px-10">
                        <button
                            style={{ backgroundColor: "#14452f", borderColor: "#0A5C56" }}
                            type="submit"
                            className=" text-white text-xl font-semibold px-3 py-2 rounded-lg">Gửi yêu cầu</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
