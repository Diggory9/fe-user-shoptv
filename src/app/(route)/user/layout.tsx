import NavUser from "@/components/layout/navuser";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" min-h-screen flex-col container mx-auto">
            <div className="flex flex-1 w-full">
                <NavUser></NavUser>
                <div className="bg-gray-50 w-full">{children}</div>
            </div>
        </div>
    );
}
