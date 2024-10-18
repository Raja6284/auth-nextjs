"use client"
import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage(){
    const router = useRouter()
    const [data,setData] = useState("nothing")

    const logout = async ()=>{
        await axios.get("/api/users/logout")
        toast.success("logout success")
        router.push("/login")
     }

     const getUserDetails = async()=>{
        const res = await axios.get("/api/users/me")
        console.log(res.data)

        setData(res.data.data._id)
     }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <hr />
        <h2 className="p-1 rounded bg-green-400 mt-4">{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button
           onClick={logout}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
            >Logout</button>

        <button
           onClick={getUserDetails}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
            >Get User</button>
    </div>
    )
}