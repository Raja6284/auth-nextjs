"use client"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        await axios.get("/api/users/logout");
        toast.success("Logout successful");
        router.push("/login");
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
            <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
                <hr className="border-gray-300 mb-4" />

                <p className="text-center text-xl font-medium mb-4">Profile page</p>

                <hr className="border-gray-300 mb-6" />

                <h2 className="text-center text-lg font-semibold p-2 rounded-lg bg-green-500 text-white mb-6">
                    {data === 'nothing' ? "No data available" : (
                        <Link href={`/profile/${data}`} className="underline hover:text-gray-200 transition duration-300">
                            {data}
                        </Link>
                    )}
                </h2>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={logout}
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
                    >
                        Logout
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
                    >
                        Get User Details
                    </button>
                </div>
            </div>
        </div>
    );
}
