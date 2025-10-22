// src/view/common/Event/MovieCard.tsx
import { ModifyBooking } from "../ModifyBooking/ModifyBooking.tsx";
import type { MovieData } from "../../../models/MovieData.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store.ts";
import { addBookingToCart } from "../../../slices/bookingCartSlice.ts";
import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
    data: MovieData;
};

type CartItem = {
    product: { id: string };
    itemCount: number;
};

export function MovieCard({ data }: MovieCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const item = useSelector((state: RootState) =>
        state.bookingCart.items.find((cartItem: CartItem) => cartItem.product.id === String(data.id))
    );

    const handleAddTicket = () => {
        dispatch(addBookingToCart(data));
        navigate('/booking'); // Navigate to booking cart after adding ticket
    };

    return (
        <div className="grandreel-card bg-[#121212] text-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] w-[15rem] h-[22rem] border border-gray-800">
            <img
                className="grandreel-poster w-full h-[12rem] object-cover"
                src={data.image}
                alt={data.name}
            />

            <div className="grandreel-details p-4 flex flex-col justify-between h-[10rem]">
                <h3 className="grandreel-title text-lg font-semibold text-white truncate">
                    {data.name}
                </h3>

                <div className="grandreel-action mt-auto">
                    {item ? (
                        <ModifyBooking data={{ id: String(data.id) }} />
                    ) : (
                        <button
                            className="grandreel-button w-full mt-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md text-sm font-medium transition-all"
                            onClick={handleAddTicket}
                        >
                            Add Ticket
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}