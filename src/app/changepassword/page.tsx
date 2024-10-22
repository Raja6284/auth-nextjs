"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ChangePasswordPage() {
    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Extracting token from URL
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const resetToken = queryParams.get("token");
        if (resetToken) {
            setToken(resetToken);
        } else {
            toast.error("Invalid or missing token");
            router.push("/resetpassword"); // Redirect if token is missing
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (newpassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // if (newPassword.length < 8) {
        //     toast.error("Password must be at least 8 characters long");
        //     return;
        // }

        setLoading(true);

        try {
            // Make request to change the password
            const response = await axios.post("/api/users/changepassword", { token, newpassword });
            toast.success("Password changed successfully!");
            router.push("/login"); // Redirect to login after successful change
        } catch (error:any) {
            toast.error(error.response?.data?.message || "Failed to change password. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newpassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                        } focus:outline-none transition duration-300 ease-in-out`}
                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
