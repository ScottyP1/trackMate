import { FaSearchLocation } from "react-icons/fa";

export default function SearchBar() {
    return (
        <form className="relative flex items-center w-full justify-center">
            {/* Search Icon */}
            <FaSearchLocation
                className="absolute left-[10px] md:left-[250px] top-1/2 transform -translate-y-1/2 text-white"
                size={20}
            />
            {/* Input Field */}
            <input
                type="text"
                className="rounded-l-lg bg-blue-500 placeholder:text-md md:placeholder:text-lg text-white p-3 pl-10 w-full md:w-[500px] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Search for a track..."
                aria-label="Search for a track"
            />
            {/* Submit Button */}
            <button type="submit" className="bg-white text-blue-500 rounded-r-lg p-3 hover:bg-blue-100 transition-all">
                Go
            </button>
        </form>
    )
}