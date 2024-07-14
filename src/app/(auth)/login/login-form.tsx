"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Toaster, toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { externalLogin, login, resetAuthStatus } from "@/redux/features/authSlice";
import { GoogleSignInButton } from "@/components/ui/auth-button";
import { getCart } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react"
export default function LoginForm() {
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const params = useSearchParams()
    const [isLoggin, setIsLogin] = useState(false);
    const auth = useAppSelector((state) => state.authCredentials);
    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            dispatch(login({ email, password }));

        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    useEffect(() => {

        if (auth.status === 'succeeded' && auth.isLogin) {
            toast.success('Login successful!');
            dispatch(resetAuthStatus());
            dispatch(getCart({ userId: auth.data?.id || '' }))
            router.push(params.get("callbackUrl") || "/");
        } else if (auth.status === 'failed') {
            toast.error(`Tài khoản mật khẩu không chính xác`);
            dispatch(resetAuthStatus());
        }
    }, [status, router, params, auth, dispatch]);
    useEffect(() => {
        if (status === 'authenticated' && session?.idToken && isLoggin == false) {
            console.log('Session authenticated with Google');
            dispatch(externalLogin({ provider: 'google', idToken: session.idToken }));
            setIsLogin(true);
            redirect('/');
        }
    }, [status, session, dispatch]);
    return (
        <> <form
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
            onSubmit={handleSubmit}
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Địa chỉ email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Mật khẩu
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="flex h-10 w-full  items-center justify-center rounded-md border border-gray-600 text-sm "
            >
                Đăng nhập
            </button>

        </form>
            <p className="text-center text-sm text-gray-600 m-3">
                Bạn chưa có tài khoản?{" "}
                <a className="font-semibold text-gray-800 " href="/register">
                    Đăng ký
                </a>
            </p>

            <GoogleSignInButton />
        </>

    );
}
