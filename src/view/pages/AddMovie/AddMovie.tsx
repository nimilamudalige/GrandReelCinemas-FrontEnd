import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveMovie,updateMovie} from "../../../slices/movieSlice.ts";

export function AddMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        console.log("Movie Data:", data);
        alert("Movie Added Successfully!");

        try {
            if (!data.image || typeof data.image !== "string") {
                console.error("Image URL is missing in data");
                return;
            }

            const formPayload = {
                id: data.id || undefined,
                name: data.name,
                genre: data.genre,
                duration: data.duration,
                image: data.image,
            };

            if (data.id) {
                await dispatch(updateMovie(formPayload));
            } else {
                await dispatch(saveMovie(formPayload));
            }

            navigate("/AddMovie", { state: { reload: true } });
            reset(); // Reset the form after submission
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">➕ Add New Movie</h1>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-gray-700 font-semibold">Movie Name</label>
                        <input
                            {...register("name")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                            placeholder="Enter movie title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Genre</label>
                        <input
                            {...register("genre")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                            placeholder="Action, Comedy, etc."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Duration</label>
                        <input
                            {...register("duration")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                            placeholder="e.g. 2h 15min"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Image URL</label>
                        <input
                            {...register("image")}
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                            placeholder="https://example.com/poster.jpg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                    >
                        Add Movie
                    </button>
                </form>
            </div>
        </div>
    );
}