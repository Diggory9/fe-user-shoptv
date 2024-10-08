"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";

import Link from "next/link";

import ApiOrder from "@/app/api/order/order-api";
import { formatDateToRender } from "@/helpers/helper";
import { MItem, OrderModel } from "@/models/order-model";
import { toast, Toaster } from "sonner";
import ColDetailOrder from "@/components/ui/col-table-item-detail-order";

export default function OrderDetail({ params }: { params: { id: string } }) {
    const [order, setOrder] = useState<OrderModel | null>(null);
    const router = useRouter();
    const { confirm } = Modal;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                ApiOrder.getDetailOrder(params.id)
                    .then((res) => {
                        setOrder(res.data);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchOrderDetails();
    }, [params.id]);

    const getStatusTag = (status?: string) => {
        switch (status) {
            case "COMPLETED":
                return <Tag color="success">Hoàn thành</Tag>;
            case "PROCESSING":
                return <Tag color="processing">Đang xử lý</Tag>;
            case "CANCELLED":
                return <Tag color="error">Đã hủy</Tag>;
            case "NEW-ORDER":
                return <Tag color="cyan">Đơn hàng mới</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };
    const handleCancelOrder = async (orderId: string) => {
        try {
            await ApiOrder.updateStatusOrder(orderId, "CANCELLED").then(
                (res) => {
                    if (res.ok) {
                        toast.success("Thành công");
                    } else {
                        toast.error("Thất bại");
                    }
                }
            );
            setOrder((prevOrder) =>
                prevOrder ? { ...prevOrder, status: "CANCELLED" } : null
            );
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };
    const calculateItemTotal = (item: any) => {
        return item.quantity * item.price;
    };

    const showDeleteConfirm = (orderId: string) => {
        confirm({
            title: "Bạn có muốn hủy đơn hàng",
            icon: <ExclamationCircleFilled />,
            content: orderId,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleCancelOrder(orderId);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center">
                <button
                    className="bg-white text-black px-4 py-2 rounded border mr-3 hover:bg-red-500"
                    onClick={() => router.back()}
                >
                    <ArrowLeftOutlined />
                </button>
                <h1 className="text-2xl font-bold">
                    Chi tiết đơn hàng {getStatusTag(order?.status)}
                </h1>
            </div>
            <div className="flex justify-between">
                <h1 className="text-xl font-bold ml-16">
                    Mã đơn hàng:{" "}
                    <span className="text-indigo-600">{order?.orderId}</span>
                </h1>

                <Button
                    onClick={() => showDeleteConfirm(order?.orderId || "")}
                    danger
                    disabled={order?.status !== "NEW-ORDER"}
                >
                    Hủy đơn hàng
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Thông tin khách hàng</h1>
                    <p>Tên: {order?.recipientName}</p>
                    <p>Số điện thoại: {order?.phone}</p>
                    <p>Địa chỉ: {order?.address}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Giao dịch</h1>
                    <p>Ngày tạo: {formatDateToRender(order?.dateCreate)}</p>
                    <p>Trạng thái: {order?.status}</p>
                    <p>Kiểu đơn hàng: {order?.orderType}</p>
                    <p>
                        Phương thức thanh toán:{" "}
                        {order?.transactions && order?.transactions[0]?.type}
                    </p>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold">Thông tin sản phẩm</h2>
                <Toaster position="top-right" richColors></Toaster>

                <div className="mt-6 border-2 rounded-lg p-4">
                    {order?.orderItems?.map((item) => (
                        <>
                            <h2 className="text-lg font-semibold">Ghi chú</h2>
                            <ColDetailOrder data={item}></ColDetailOrder>
                            <Link
                                href={`/user/review/${item?.product?.productId}`}
                            >
                                <Button
                                    type="primary"
                                    disabled={order?.status !== "COMPLETED"}
                                >
                                    Đánh giá sản phẩm
                                </Button>
                            </Link>
                        </>
                    ))}
                </div>

                <div className="mt-6 flex justify-between border rounded-lg p-4 ">
                    <div className="">
                        <h2 className="text-lg font-semibold">
                            Ghi chú đơn hàng
                        </h2>
                        <p className="text-gray-600">{order?.notes}</p>
                    </div>
                    <div className="text-lg ">
                        <p>
                            Tạm tính:{" "}
                            <span className="font-normal">
                                {order?.subTotal?.toLocaleString()} VND
                            </span>
                        </p>
                        <p className="font-bold">
                            Tổng cộng:{" "}
                            <span className="font-bold">
                                {order?.total?.toLocaleString()} VND
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
