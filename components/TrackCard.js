import Link from 'next/link';

export const TrackCard = ({ track }) => {
    const imageUrl = track.image && track.image.trim()
        ? track.image
        : 'https://via.placeholder.com/300x300?text=No+Image';

    return (
        <Link href={`/Tracks/${track.id}`} className="block">
            <div className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500 hover:-translate-y-4">
                <img
                    src={imageUrl}
                    alt={track.name || 'Track Image'}
                    className="object-cover aspect-square w-[500px] h-[300px]"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
                <div className="p-4">
                    <h2 className="text-white text-lg font-bold">{track.name}</h2>
                    <p className="text-gray-400 text-sm">{track.address}</p>
                    <p className="text-yellow-400 font-semibold">
                        Rating: {track.rating || 'N/A'}
                    </p>
                </div>
            </div>
        </Link>
    );
};
