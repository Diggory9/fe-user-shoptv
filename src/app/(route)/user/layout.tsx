import NavUser from "@/components/layout/navuser";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white- min-h-screen flex-col">
            <div className="flex flex-1 w-full">
                <NavUser></NavUser>
                <div className="bg-gray-50 w-full">{children}</div>
            </div>
        </div>
    );
}
