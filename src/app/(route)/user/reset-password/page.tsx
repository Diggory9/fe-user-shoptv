"use client";
import { useEffect, useState } from "react";
import ResetPasswordForm from "@/app/(route)/user/reset-password/reset-password-form";
import { Toaster } from "sonner";

export default function ChangePassword() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex">
            <div className="w-full p-5 bg-white rounded-lg">
                <Toaster position="top-right" richColors duration={2000} />
                <ResetPasswordForm />
            </div>
        </div>
    );
}
