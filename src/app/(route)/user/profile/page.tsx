"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Profile() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.authCredentials);
    return (
        <>
            <div>UserName: {auth.data?.userName}</div>
            <div>Email: {auth.data?.email}</div>
        </>
    );
}
