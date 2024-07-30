import ApiProduct from "@/app/api/product/product";
import { ProductModel } from "@/models/product-model";
import { Button, Col, Row, Slider } from "antd";
import { useState } from "react";

interface FilterPriceProps {
    onFilterChange: (products: ProductModel[]) => void;
    setLoading: (loading: boolean) => void;
}

export default function FilterPrice({
    onFilterChange,
    setLoading,
}: FilterPriceProps) {
    const [range, setRange] = useState([100000, 1000000]);
    const [loading, setLoadingState] = useState(false);

    const onChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setRange(value);
        }
    };

    const handleFilterPrice = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setLoading(true);
            setLoadingState(true);
            ApiProduct.getProductsbyPrice({
                fromPrice: value[0],
                toPrice: value[1],
                pageNumber: 1,
                pageSize: 10,
            })
                .then((res) => {
                    onFilterChange(res.data);
                    setLoading(false);
                    setLoadingState(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    setLoadingState(false);
                });
        }
    };

    return (
        <div className="py-2">
            <h1 className="font-semibold">Lọc sản phẩm theo giá</h1>
            <Row>
                <Col span={24}>
                    <div className="flex justify-between mb-4">
                        <span>{range[0].toLocaleString()} VND</span>
                        <span>{"--->"}</span>
                        <span>{range[1].toLocaleString()} VND</span>
                    </div>
                    <Slider
                        range
                        step={100000}
                        defaultValue={range}
                        onChange={onChange}
                        max={50000000}
                        min={0}
                    />
                    <Button
                        onClick={() => handleFilterPrice(range)}
                        loading={loading}
                    >
                        Áp dụng
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
