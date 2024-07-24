import LoginForm from "@/app/(auth)/login/login-form";
import { Suspense } from "react";
import { Toaster } from "sonner";

export default function Login() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <div
                style={{
                    backgroundImage: "url(/img/hello.png)",
                    backgroundSize: "cover",
                }}
                className="bg-no-repeat bg-gray-50 flex h-screen w-screen items-center justify-end "
            >
                <div className="w-full max-w-lg rounded-2xl border border-gray-100 shadow-xl bg-white ">
                    <div className="flex flex-col space-y-3 rounded-lg border-gray-200 bg-white py-8 px-6 text-center sm:px-16">
                        <Toaster
                            position="top-right"
                            richColors
                            duration={2000}
                        />
                        <h3 className="text-2xl font-semibold pb-4">
                            Đăng nhập
                        </h3>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
