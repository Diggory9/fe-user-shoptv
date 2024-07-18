"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Profile() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.authCredentials);
    return (
        <div className="p-3">
            <div>UserName: {auth.data?.userName}</div>

            <div>Email: {auth.data?.email}</div>
        </div>
    );
}
