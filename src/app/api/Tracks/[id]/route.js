import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = await params; // Google Place ID
    const GOOGLE_CUSTOM_SEARCH_API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY; // Custom Search API Key
    const GOOGLE_CUSTOM_SEARCH_CX = process.env.GOOGLE_CUSTOM_SEARCH_CX; // Custom Search Engine ID

    try {
        // Fetch place details from Google Places API
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${GOOGLE_CUSTOM_SEARCH_API_KEY}`
        );
        const data = await response.json();

        if (data.status === 'OK') {
            const { result } = data;

            // Map through photos to get up to 10 image URLs
            const images = result.photos
                ? result.photos.slice(0, 10).map(photo =>
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_CUSTOM_SEARCH_API_KEY}`
                )
                : [];

            // Fetch logo for the track
            // const logoUrl = await fetchLogoForTrack(result.name);

            // Build the response
            const track = {
                id: result.place_id,
                name: result.name,
                website: result.website,
                address: result.formatted_address,
                images: images.length > 0 ? images : ['https://via.placeholder.com/300x300?text=No+Image'],
                // logo: logoUrl || 'https://via.placeholder.com/300x300?text=No+Logo',
                rating: result.rating || 'N/A',
            };

            return NextResponse.json(track);
        } else {
            return NextResponse.json(
                { error: data.error_message || 'Track not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error fetching track details:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching track details.' },
            { status: 500 }
        );
    }
}

// Fetch a logo for a specific track using Google Custom Search API
// async function fetchLogoForTrack(trackName) {
//     const API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
//     const CX = process.env.GOOGLE_CUSTOM_SEARCH_CX;

//     try {
//         const response = await fetch(
//             `https://www.googleapis.com/customsearch/v1?q=${trackName} logo&cx=${CX}&searchType=image&key=${API_KEY}`
//         );
//         const data = await response.json();
//         console.log(data); // Return the thumbnail link

//     } catch (error) {
//         console.error('Error fetching logo:', error);
//         return 'https://via.placeholder.com/300x300?text=No+Logo'; // Fallback in case of an error
//     }
// }


// Helper function to validate image URLs
function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
}
