"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";

import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // console.log("store: ", store.getState());
    return (
        <SessionProvider>
            <Provider store={store}>
                {/* <PersistGate persistor={persistor}>
                    {children}
                </PersistGate> */}
                {children}
            </Provider>
        </SessionProvider>
    );
}
