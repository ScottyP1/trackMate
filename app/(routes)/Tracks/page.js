'use client';

import { useEffect, useContext } from "react";

import { Context as TrackContext } from '../../../context/TrackContext';

import SearchBar from "../../../components/SearchBar";
import { TrackCardSkeleton } from "../../../components/TrackCardSkeleton";
import { TrackCard } from "../../../components/TrackCard";

export default function Tracks() {
    const { state, fetchTracks } = useContext(TrackContext);

    useEffect(() => {
        fetchTracks();
    }, []);

    return (
        <div className="mt-24 mx-6 md:mx-0">
            <h1 className="text-center text-2xl text-gray-300 mb-8">
                Enter your zip code to find tracks near you
            </h1>
            <div className="relative w-full max-w-screen-lg mx-auto mb-12">
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {state.loading
                    ? // Render skeletons while loading
                    [...Array(6)].map((_, index) => (
                        <TrackCardSkeleton key={index} />
                    ))
                    : // Render actual track cards once loaded
                    state.tracks.map((track, index) => (
                        <TrackCard
                            key={index}
                            track={{
                                id: track.place_id,
                                name: track.name,
                                address: track.formatted_address,
                                image: track.image || null,
                                rating: track.rating,
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}
