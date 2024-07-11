"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
    const handleClick = () => {
        signIn("google");
    };

    return (
        <button
            onClick={handleClick}
            className="flex h-10 w-75 mx-auto my-3  items-center font-semibold justify-center px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image src='/img/google.png' alt="Google Logo" width={20} height={20} />
            <span className="ml-2">Đăng nhập với Google</span>
        </button>
    );
}

export function GithubSignInButton() {
    const handleClick = () => {
        signIn("github");
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >


            <span className="ml-4">Continue with Github</span>
        </button>
    );
}

export function CredentialsSignInButton() {
    const handleClick = () => {
        signIn();
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
            <span className="ml-4">Continue with Email</span>
        </button>
    );
}