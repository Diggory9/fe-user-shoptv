"use client";
import Blognews from "@/components/layout/blognews";
export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-4/5 mx-auto my-12">
            <div className="w-1/5">
                <Blognews></Blognews>
            </div>
            <div className="w-4/5 pl-2">{children}</div>
        </div>
    );
}
