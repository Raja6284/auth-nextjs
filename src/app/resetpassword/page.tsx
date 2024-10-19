"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError(true);
            return;
        }

        try {
            await axios.post('/api/users/resetpassword', { token, newPassword });
            setSuccess(true);  // Mark success
        } catch (error) {
            setError(true);
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    // If the password reset was successful, redirect to the login page
    useEffect(() => {
        if (success) {
            router.push("/login");
        }
    }, [success, router]);  // Trigger redirect when `success` is true

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-4xl">Reset Password</h1>

            <input
                type="password"
                placeholder="New Password"
                className="p-2 border border-gray-300 rounded text-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 border border-gray-300 rounded mt-4 text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                onClick={resetPassword}
                className="bg-blue-500 text-white p-2 rounded mt-4"
            >
                Reset Password
            </button>

            {error && <p className="text-red-500 mt-4">Error resetting password. Please try again.</p>}
        </div>
    );
}
