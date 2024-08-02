import ApiBlog from "@/app/api/blog/blog-api";
import { Dropdown, Menu } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DropdownCollection() {
    const [dataCollection, setDataCollection] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        ApiBlog.getAllGroupBlog()
            .then((res) => {
                setDataCollection(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClick = (id: string) => {
        router.push(`/blog/${id}`);
    };
    // console.log(dataCollection);

    const items = dataCollection.map((item: any) => ({
        key: item.id,
        label: <span onClick={() => handleClick(item.id)}>{item.name}</span>,
    }));

    const collectionMenu = {
        items,
    };

    return (
        <Dropdown menu={collectionMenu} trigger={["hover"]}>
            <span>
                <a
                    className="px-2 hover:underline font-serif uppercase font-normal text-sm hover:text-orange-400"
                    href="#"
                >
                    Bộ sưu tập
                </a>
            </span>
        </Dropdown>
    );
}
