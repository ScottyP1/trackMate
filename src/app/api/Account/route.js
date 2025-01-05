import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/models/User"; // Import the User model

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return new Response("Email is required", { status: 400 });
    }

    try {
        await dbConnect(); // Ensure the database is connected

        // Fetch the user by email
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response("Failed to fetch user", { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await dbConnect(); // Ensure the database is connected

        const body = await req.json();
        const { email, updates } = body;

        if (!email || !updates) {
            return new Response("Email and updates are required", { status: 400 });
        }

        // Update the user in the database
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: updates },
            { new: true } // Return the updated document
        ).exec();

        if (!updatedUser) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify({ user: updatedUser }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Failed to update user", { status: 500 });
    }
}