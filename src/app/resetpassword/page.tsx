"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        setLoading(true);     // Start loading indicator

        try {
            await axios.post("/api/users/resetpassword", { email });
            toast.success("Password reset link sent to your email");
        } catch (error) {
            toast.error("Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);  // Stop loading indicator
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}  // Disable button while loading
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none transition duration-300 ease-in-out`}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
