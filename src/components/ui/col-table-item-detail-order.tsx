/* eslint-disable @next/next/no-img-element */
import { MItem } from "@/models/order-model";

export default function ColDetailOrder({ data }: { data: MItem }) {
    const sumTotal = () => {
        return (data.price || 0) * (data?.quantity || 0);
    };
    return (
        <div key={data.productItemId} className="border-b pb-2 mb-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={data?.product?.image || "/img/1.png"}
                        alt={data?.product?.productName}
                        className="w-16 h-16 mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">
                            {data?.product?.productName}
                        </h2>
                        <p className="text-sm text-gray-600">
                            Màu sắc: {data?.product?.colorItem?.colorName}
                        </p>
                        <p className="text-sm text-gray-600">
                            Số lượng: {data?.quantity}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            Giá tiền: {data?.price}
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <p className="text-lg pr-5">
                        {sumTotal().toLocaleString()} VND
                    </p>
                </div>
            </div>
        </div>
    );
}
