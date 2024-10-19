"use client"
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-4xl font-bold text-center mb-6">Verify Your Email</h1>

                <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 rounded-lg text-center">
                    <h2 className="break-all text-lg font-semibold">{token ? `${token}` : "No token provided"}</h2>
                </div>

                {verified ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-500 mb-6">Email Verified Successfully!</h2>
                        <Link href="/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium">
                            Proceed to Login
                        </Link>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-6">Error Verifying Email</h2>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">Verifying...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
