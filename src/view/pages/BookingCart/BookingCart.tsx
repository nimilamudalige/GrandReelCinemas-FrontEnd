import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store.ts";

type BookingCartItem = {
    id: string;
    name: string;
    price: number;
    currency: string;
    itemCount: number;
};

export function BookingCart() {
    const items: BookingCartItem[] = useSelector((state: RootState) => state.bookingCart.items);

    return (
        <div className="flex justify-center items-center px-4 py-8 bg-black min-h-screen">
            <div className="w-full max-w-7xl border border-indigo-500 rounded-lg overflow-x-auto shadow-xl">
                <table className="min-w-full text-white">
                    <thead>
                    <tr className="bg-indigo-800 text-white">
                        <th className="text-lg font-semibold border border-indigo-700 p-3">🎫 ID</th>
                        <th className="text-lg font-semibold border border-indigo-700 p-3">Movie</th>
                        <th className="text-lg font-semibold border border-indigo-700 p-3">Ticket Price</th>
                        <th className="text-lg font-semibold border border-indigo-700 p-3">Tickets</th>
                        <th className="text-lg font-semibold border border-indigo-700 p-3">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-4 text-center text-xl bg-indigo-100 text-indigo-700">
                                No bookings added yet!
                            </td>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-800" : "bg-slate-800"
                                } hover:bg-slate-700`}
                            >
                                <td className="text-center text-lg border border-slate-600 p-3">{item.id}</td>
                                <td className="text-center text-lg border border-slate-600 p-3">{item.name}</td>
                                <td className="text-center text-lg border border-slate-600 p-3">
                                    {item.price} {item.currency}
                                </td>
                                <td className="text-center text-lg border border-slate-600 p-3">{item.itemCount}</td>
                                <td className="text-center text-lg border border-slate-600 p-3">
                                    {(item.price * item.itemCount).toFixed(2)} {item.currency}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}