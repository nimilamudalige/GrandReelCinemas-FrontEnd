import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function UpdateMovie() {
    const { register, handleSubmit, reset, setValue } = useForm();

    // Simulating fetching movie details from backend
    useEffect(() => {
        const movieData = {
            name: "Avengers: Endgame",
            genre: "Action, Sci-Fi",
            duration: "3h 2min",
            image: "https://example.com/endgame.jpg"
        };

        // Pre-fill form with movie data
        setValue("name", movieData.name);
        setValue("genre", movieData.genre);
        setValue("duration", movieData.duration);
        setValue("image", movieData.image);
    }, [setValue]);

    const onSubmit = (data: any) => {
        console.log("Updated Movie Data:", data);
        alert("Movie Updated Successfully!");
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">✏️ Update Movie</h1>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-gray-700 font-semibold">Movie Name</label>
                        <input
                            {...register("name")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-200"
                            placeholder="Enter movie title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Genre</label>
                        <input
                            {...register("genre")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-200"
                            placeholder="Action, Comedy, etc."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Duration</label>
                        <input
                            {...register("duration")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-200"
                            placeholder="e.g. 2h 15min"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Image URL</label>
                        <input
                            {...register("image")}
                            type="url"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-200"
                            placeholder="https://example.com/poster.jpg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
                    >
                        Update Movie
                    </button>
                </form>
            </div>
        </div>
    );
}
