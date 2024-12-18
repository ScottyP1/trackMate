'use client';
import { useState, useEffect } from "react";

export default function TrackCounter() {
    const [count, setCount] = useState({
        publicTracks: 10,
        privateTracks: 5,
        riders: 100
    });

    return (
        <div className="flex justify-center items-center mt-12 md:space-x-20 p-4">
            <div className="text-center w-full md:w-[200px]">
                <p className="text-6xl sm:text-8xl text-blue-500">{count.publicTracks}</p>
                <h3 className="text-xs text-white sm:text-2xl cheesy tracking-[2px]">Public Tracks</h3>
            </div>
            <div className="text-center w-full md:w-[200px]">
                <p className="text-6xl sm:text-8xl text-blue-500">{count.privateTracks}</p>
                <h3 className="text-xs text-white sm:text-2xl cheesy tracking-[2px]">Private Tracks</h3>
            </div>
            <div className="text-center w-full md:w-[200px]">
                <p className="text-6xl sm:text-8xl text-blue-500">{count.riders}</p>
                <h3 className="text-xs text-white sm:text-2xl cheesy tracking-[2px]">Riders Joined</h3>
            </div>
        </div>
    );
}
