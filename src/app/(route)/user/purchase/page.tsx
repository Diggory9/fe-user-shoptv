"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Modal } from "antd";
import Link from "next/link";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ApiOrder from "@/app/api/order/order-api";
import { OrderData, OrderModel } from "@/models/order-model";
import { error } from "console";

const Purchase: React.FC = () => {
    const auth = useAppSelector((state) => state.authCredentials);
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const { confirm } = Modal;
    console.log(auth?.data?.id);
    useEffect(() => {
        if (auth?.data?.id) {
            ApiOrder.getOrdersByUserId(auth?.data?.id)
                .then((res) => {
                    setOrders(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [auth?.data?.id]);
    console.log(orders);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "ss",
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "orderNumber",
            key: "orderNumber",
        },
        {
            title: "Người nhận",
            dataIndex: "recipientName",
            key: "recipientName",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
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
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (
                _: any,
                record: {
                    orderNumber: string;
                    key: any;
                    status: string;
                }
            ) => (
                <>
                    <Link
                        className="pr-6"
                        href={`/user/purchase/detail/${record.orderNumber}`}
                    >
                        <Button type="link">Chi tiết </Button>
                    </Link>
                    <Button
                        onClick={() => showDeleteConfirm(record.orderNumber)}
                        danger
                        disabled={record.status !== "NEW-ORDER"}
                    >
                        Hủy đơn hàng{" "}
                    </Button>
                </>
            ),
        },
    ];
    const handleCancelOrder = async (orderId: string) => {
        try {
            await ApiOrder.updateStatusOrder(orderId, "CANCELLED");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, status: "CANCELLED" }
                        : order
                )
            );
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
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

    const dataSource: OrderData[] = Array.isArray(orders)
        ? orders.map((item, index) => ({
              key: item.id || index,
              stt: index + 1,
              orderNumber: item.id || "",
              status: item.status || "",
              recipientName: item.recipientName || "",
              total: item.total || 0,
          }))
        : [];
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl font-bold pb-6">Thông tin đơn hàng</h1>
            <Table
                rowKey="orderNumber"
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 600 }} // For horizontal scroll on smaller screens
                size="middle" // Adjust table size
            />
        </div>
    );
};

export default Purchase;
