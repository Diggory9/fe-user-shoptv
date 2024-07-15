/* eslint-disable @next/next/no-img-element */
import ApiReview from "@/app/api/review/review";
import { formatDate, formattedDateTime } from "@/helpers/helper";
import { ReviewModel } from "@/models/review-model";
import { Rate } from "antd";
import { useEffect, useState } from "react";

interface ReviewsResponse {
    totalCount: number;
    averageRating: number;
    data: ReviewModel[];
}

export default function Review({ productId }: { productId: string }) {
    const [data, setData] = useState<ReviewsResponse | null>(null);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetDataReviews = async () => {
            try {
                ApiReview.getReviews({ productId, pageNumber, pageSize })
                    .then((res) => {
                        setData(res);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetDataReviews();
    }, [productId, pageNumber, pageSize]);

    return (
        <div className="h-max container w-full">
            <div className="max-w-md mx-auto p-4 pt-6 bg-white rounded shadow-md">
                {!data ? (
                    <div>Chua co rev</div>
                ) : (
                    <>
                        <div className="flex justify-between mb-4 border-b-2 border-spacing-1 border-gray-400 py-4">
                            <p className="text-gray-600 w-1/2">
                                <span className="font-semibold text-lg">
                                    Tổng số đánh giá:{" "}
                                </span>
                                &nbsp;
                                <span className="text-lg">
                                    {data?.totalCount}
                                </span>
                            </p>
                            <div className="text-gray-600">
                                <span className="font-semibold text-lg">
                                    Đánh giá trung bình:{" "}
                                </span>
                                &nbsp;
                                <span className="text-lg">
                                    {data?.averageRating}
                                </span>
                                <Rate
                                    className="mt-3"
                                    allowHalf
                                    disabled
                                    defaultValue={data.averageRating}
                                />
                            </div>
                        </div>

                        {data?.data.map((item) => (
                            <div className="list-none mb-0" key={item.id}>
                                <div className="py-4 border-b border-gray-200">
                                    <div className="text-gray-600">
                                        <p className="text-sm mb-4 flex justify-between">
                                            <span>
                                                {" "}
                                                Đánh giá bởi{" "}
                                                <span className="font-bold">
                                                    {item.userName}
                                                </span>{" "}
                                                vào ngày{" "}
                                            </span>{" "}
                                            <span>
                                                {formatDate(
                                                    new Date(item.createAt)
                                                )}
                                            </span>
                                        </p>
                                        <Rate
                                            allowHalf
                                            disabled
                                            defaultValue={item.rating}
                                        />
                                        <p>{item.content}</p>
                                        <div className="flex">
                                            {item?.reviewImages?.map(
                                                (image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image.url}
                                                        alt="Image"
                                                        className="w-20 h-20 rounded-full mr-2"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
