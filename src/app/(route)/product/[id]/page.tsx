
import { DetailProduct } from "@/app/(route)/product/[id]/product-detail";
import ApiProduct from "@/app/api/product/product";

const getData = async (id: string) => {
    const data = await ApiProduct.getDetailProducts(id);
    return data
}
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return <DetailProduct data={data?.data} />
}
