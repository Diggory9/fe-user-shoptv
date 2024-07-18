import { numberFormatLocationVietNam } from "@/helpers/helper";
import { Button } from "antd";
import { useRouter } from "next/navigation";
export default function SummaryCartOrder({ totalPrice }: { totalPrice: number }) {
    const router = useRouter()
    const handleCheckout = () => {
        router.push('/checkout');
    };


    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-semibold mb-4">
                Tóm tắt đơn hàng
            </h2>
            <div className="flex justify-between mb-2">
                <span>Thành tiền: </span>
                <span>
                    {numberFormatLocationVietNam(totalPrice || 0)}
                </span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Vận chuyển</span>
                <span>Liên hệ phí vận chuyển sau</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span>
                    {numberFormatLocationVietNam(totalPrice || 0)}
                </span>
            </div>
            <Button
                onClick={handleCheckout}
                type="primary"
                className="mt-4 w-full"
            >
                Thanh toán
            </Button>
        </div>
    )
};
