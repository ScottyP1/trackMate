import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../lib/models/User';

// POST /api/auth/register
export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Create and save the user
        const user = new User({ name, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Return success response
        return NextResponse.json({ token });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 422 });
    }
}
