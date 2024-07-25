import RegisterForm from "@/app/(auth)/register/regiter-form";
import { Suspense } from "react";
import { Toaster, toast } from "sonner";
export default function Register() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <div
                style={{
                    backgroundImage: "url(/img/hello.png)",
                    backgroundSize: "cover",
                }}
                className="bg-no-repeat bg-gray-50 flex h-screen w-screen items-center justify-end"
            >
                <div className="w-full max-w-lg rounded-2xl border border-gray-100 shadow-xl bg-white bg-opacity-20 mr-0 lg:mr-12 xl:mr-16 2xl:mr-20">
                    <div className="flex flex-col space-y-3 rounded-lg border border-gray-200 bg-white bg-opacity-80 py-8 px-6 text-center sm:px-16">
                        <Toaster
                            position="top-right"
                            richColors
                            duration={2000}
                        />
                        <h3 className="text-2xl font-semibold pb-4">
                            Đăng ký tài khoản
                        </h3>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
