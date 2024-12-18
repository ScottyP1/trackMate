'use client';

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Context as AuthContext } from "../../../context/AuthContext";

export default function Register() {
    const { state, register, clearError } = useContext(AuthContext);
    const [data, setData] = useState({ name: '', email: '', password: '' });
    const router = useRouter();

    // Clear error when the component mounts
    useEffect(() => {
        clearError();
    }, []);

    // Redirect if the token is set
    useEffect(() => {
        if (state.token) {
            router.push('/'); // Redirect to homepage after successful registration
        }
    }, [state.token, router]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        register({ name: data.name, email: data.email, password: data.password });
    };

    return (
        <div className="mt-32 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-black">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-black">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-black">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        {state.errorMessage && (
                            <h1 className="text-red-500 text-center text-xl m-4">{state.errorMessage}</h1>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
                            Submit
                        </button>
                    </div>
                </form>
                <p className="text-black text-sm mt-2">
                    Already have an account? Click <Link href='/Login'>here</Link> to Login
                </p>
            </div>
        </div>
    );
}
