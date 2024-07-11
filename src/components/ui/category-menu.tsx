"use client";

import ApiCategory from "@/app/api/category/category";
import RecursiveMenu from "@/components/ui/recursive-menu";
import { CategoryModel } from "@/models/category-model";
import { useEffect, useState } from "react";

interface CategoryComponentProps {
    onSelectCategory: (value: string) => void;
    selectedCategory: string;
}

export default function CategoryMenu({ onSelectCategory, selectedCategory }: CategoryComponentProps) {
    const [dataCategories, setDataCategories] = useState<CategoryModel[]>([]);


    useEffect(() => {
        const fetchDataCategories = async () => {
            try {
                ApiCategory.getCategory()
                    .then((res) => {
                        console.log(res)
                        setDataCategories(res.data);
                    }).catch(error => console.error(error));
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchDataCategories();
    }, []);

    return (
        <div className="border-r-4">
            <h2 className="text-xl font-semibold font-serif text-gray-900 pb-4 uppercase">
                Danh mục
            </h2>
            <ul className="space-y-3">
                <li>
                    <button
                        onClick={() => onSelectCategory("All")}
                        className={`text-left w-full p-2 rounded ${selectedCategory === "All"
                            ? "bg-gray-200"
                            : "bg-white"
                            } hover:bg-gray-100`}
                    >
                        Tất cả sản phẩm
                    </button>
                </li>
                <div className="dropdown inline-block relative w-full">
                    <RecursiveMenu categories={dataCategories} parentId={null} handleOnSelectCategory={onSelectCategory} />
                </div>
            </ul>
        </div>
    );
}
