import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store.ts";
import { decreaseQuantity, increaseQuantity } from "../../../slices/bookingCartSlice.ts";

interface ModifyBookingProps {
    data: { id: string };
}

type CartItem = {
    product: { id: string };
    itemCount: number;
};

export function ModifyBooking({ data }: ModifyBookingProps) {
    const dispatch = useDispatch<AppDispatch>();
    const item = useSelector((state: RootState) =>
        state.cart.items.find((cartItem: CartItem) => cartItem.product.id === data.id)
    );

    const decreaseTicketCount = () => {
        if (item && item.itemCount > 1) {
            dispatch(decreaseQuantity(parseInt(data.id, 10)));
        } else {
            alert("You must book at least one ticket.");
        }
    };

    const increaseTicketCount = () => {
        dispatch(increaseQuantity(parseInt(data.id, 10)));
    };

    return (
        <div className="grandreel-booking-controls flex items-center justify-between w-full mt-4 px-2">
            <button
                className="grandreel-btn-minus text-xl font-bold bg-yellow-400 hover:bg-yellow-300
                           text-black w-9 h-9 rounded-full flex items-center justify-center"
                onClick={decreaseTicketCount}
            >
                −
            </button>

            <span className="grandreel-count text-lg font-semibold text-white">
                {item?.itemCount}
            </span>

            <button
                className="grandreel-btn-plus text-xl font-bold bg-yellow-400 hover:bg-yellow-300
                           text-black w-9 h-9 rounded-full flex items-center justify-center"
                onClick={increaseTicketCount}
            >
                +
            </button>
        </div>
    );
}