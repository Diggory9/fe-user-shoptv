import RegisterForm from "@/app/(auth)/register/regiter-form";
import { GoogleSignInButton } from "@/components/ui/auth-button";
import { Toaster, toast } from "sonner";
export default function Register() {
    return (
        <div
            style={{
                backgroundImage: "url(/img/hello.png)",
                backgroundSize: "100%",
            }}
            className=" bg-no-repeat overflow-x-hidden  flex h-screen w-screen items-center justify-end bg-gray-50 "
        >
            <div className="w-full max-w-lg  rounded-2xl border border-gray-100 shadow-xl mr-52 ">
                <div className=" flex flex-col  space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <Toaster position="top-right" richColors duration={2000} />
                    <h3 className="text-2xl font-semibold pb-4">Đăng ký</h3>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
