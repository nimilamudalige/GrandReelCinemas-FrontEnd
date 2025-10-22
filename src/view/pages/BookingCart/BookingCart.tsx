// src/view/pages/BookingCart/BookingCart.tsx
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, clearCart } from '../../../slices/bookingCartSlice';
import { savePayment } from '../../../slices/paymentSlice';
import type { RootState } from '../../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';

const TICKET_PRICE = 800;

export function BookingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [userId, setUserId] = useState<string>('');

    const cartItems = useSelector((state: RootState) => state.bookingCart.items);
    const { loading, error } = useSelector((state: RootState) => state.payment);
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            alert('Please log in to proceed with payment');
            navigate('/login');
            return;
        }
        setUserId(storedUserId);
    }, [navigate]);
    const calculateSubtotal = (ticketCount: number) => {
        return TICKET_PRICE * ticketCount;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item.ticketCount), 0);
    };

    const handlePayment = async () => {
        if (!userId) {
            alert('Please log in to proceed with payment');
            navigate('/login');
            return;
        }
        try {
            setIsProcessing(true);

            const paymentPromises = cartItems.map(item => {
                const paymentData = {
                    amount: calculateSubtotal(item.ticketCount),
                    movieId: item.movie.id,
                    userId: localStorage.getItem('userId') || '',
                    quantity: item.ticketCount,
                    movieName: item.movie.name
                };
                return dispatch(savePayment(paymentData)).unwrap();
            });

            await Promise.all(paymentPromises);
            dispatch(clearCart());
            alert('Payment successful! Thank you for your purchase.');
            navigate('/');
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Booking Cart</h1>
                <p className="text-gray-400 mb-4">Your cart is empty</p>
                <Link
                    to="/"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                    Browse Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-8">Your Selected Movies</h1>

            {cartItems.map((item) => (
                <div key={item.movie.id} className="bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <img
                                src={item.movie.image}
                                alt={item.movie.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">{item.movie.name}</h2>
                            <p className="text-gray-400 mb-4">{item.movie.description}</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Price per ticket:</span>
                                    <span className="text-green-500 font-bold">Rs{TICKET_PRICE}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Tickets:</span>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => dispatch(decreaseQuantity(item.movie.id))}
                                            disabled={isProcessing || item.ticketCount <= 1}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full disabled:opacity-50"
                                        >
                                            -
                                        </button>
                                        <span className="text-white text-lg font-medium w-8 text-center">
                                            {item.ticketCount}
                                        </span>
                                        <button
                                            onClick={() => dispatch(increaseQuantity(item.movie.id))}
                                            disabled={isProcessing}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                                    <span className="text-gray-300">Subtotal:</span>
                                    <span className="text-green-500 font-bold text-xl">
                                        Rs{calculateSubtotal(item.ticketCount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="bg-gray-800 rounded-lg p-6 mt-6">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xl text-white">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-500">
                        Rs{calculateTotal()}
                    </span>
                </div>
                <button
                    onClick={handlePayment}
                    disabled={isProcessing || loading || cartItems.length === 0}
                    className={`w-full ${
                        isProcessing || loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                    } text-white font-bold py-3 px-4 rounded-lg transition duration-300`}
                >
                    {isProcessing || loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
                {error && (
                    <p className="text-red-500 text-center mt-2">{error}</p>
                )}
            </div>
        </div>
    );
}