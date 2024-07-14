import ResetPasswordForm from "@/app/(route)/user/reset-password/reset-password-form";
import { Toaster } from "sonner";

export default function ChangePassword() {
    return (
        <div className="w-1/3 p-5">
            <Toaster position="top-right" richColors></Toaster>
            <ResetPasswordForm></ResetPasswordForm>
        </div>
    );
}
