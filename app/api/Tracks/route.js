import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=dirt+bike+track&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (!data.results) {
            return NextResponse.json(
                { error: 'No tracks found.' },
                { status: 404 }
            );
        }

        // Fetch images for each track
        const tracksWithImages = await Promise.all(
            data.results.map(async (track) => {
                const imageUrl = await fetchImageForTrack(track.name);
                return {
                    ...track,
                    image: imageUrl,
                };
            })
        );

        return NextResponse.json(tracksWithImages); // Return tracks with images
    } catch (error) {
        console.error('Error fetching tracks or images:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tracks.' },
            { status: 500 }
        );
    }
}

// Fetch image for a specific track using Google Custom Search API
async function fetchImageForTrack(trackName) {
    const API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY; // Use your Google Custom Search API key
    const CX = process.env.GOOGLE_CUSTOM_SEARCH_CX; // Use your Custom Search Engine ID

    try {
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
                trackName
            )}&cx=${CX}&searchType=image&key=${API_KEY}`
        );
        const data = await response.json();

        if (data?.items?.length > 0) {
            for (const item of data.items) {
                if (item.link && isValidImageUrl(item.link)) {
                    return item.link;
                }
            }
        }
        return 'https://via.placeholder.com/300x300?text=No+Image';
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'https://via.placeholder.com/300x300?text=No+Image';
    }
}

// Helper function to validate image URLs
function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
}
