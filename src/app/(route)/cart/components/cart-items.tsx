"use-client";
import CartItem from "@/app/(route)/cart/components/item";
import { CartModel } from "@/models/cart-model";

export default function CartItems({ cartItems }: { cartItems: CartModel[] }) {
    return (
        <>
            {cartItems?.map((item) => (
                <div key={item.id} className="flex justify-between py-4">
                    <CartItem cartItem={item} />
                </div>
            ))}
        </>
    );
}
