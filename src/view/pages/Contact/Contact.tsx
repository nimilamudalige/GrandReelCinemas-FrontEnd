import { useForm } from "react-hook-form";

type FormData = {
    email: string;
    subject: string;
    message: string;
};

export function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        alert(`Thank you for contacting us, ${data.subject}!`);
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-16">
            <div className="w-full max-w-xl bg-white bg-opacity-5 backdrop-blur-lg rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-semibold text-green-800 text-center mb-8">Contact Us</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-lg bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Subject */}
                    <div>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-3 rounded-lg bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            {...register("subject", {
                                required: "Subject is required",
                                minLength: {
                                    value: 5,
                                    message: "Subject must be at least 5 characters long",
                                },
                            })}
                        />
                        {errors.subject && (
                            <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div>
            <textarea
                placeholder="Your message..."
                rows={5}
                className="w-full p-3 rounded-lg bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                {...register("message", { required: "Message is required" })}
            />
                        {errors.message && (
                            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
