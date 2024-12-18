import TrackLogo from "../../../../components/FetchLogo";
import Link from "next/link";

export default async function TrackDetails({ params }) {
    const { id } = await params;

    // Fetch track details
    const response = await fetch(`https://track-mate-eight.vercel.app/api/Tracks/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch track details for ID: ${id}`);
    }
    const track = await response.json();
    return (
        <div className="mt-24 mx-4">
            {/* Track Title and Basic Info */}
            <TrackLogo websiteUrl={track.website} />
            <h1 className="text-2xl md:text-6xl font-bold">{track.name}</h1>
            {/* <TrackLogo websiteUrl=/> */}
            <p className="text-sm md:text-xl">{track.address}</p>
            {track.website && <Link href={track.website}><p>{track.website}</p></Link>}
            <p>Rating: {track.rating || "N/A"}</p>

            {/* Images Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {track.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1} of ${track.name}`}
                        className="rounded-lg shadow-md w-[200px] h-[200px] md:w-[500px] md:h-[400px]"
                    />
                ))}
            </div>
        </div>
    );
}
