/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"





export default function LoginPage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:""
    })

    const [buttonDisabled,setbuttonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setbuttonDisabled(false)
       }else{
            setbuttonDisabled(true)
       }
    },[user])
    
    const onLogin = async()=>{
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("login success",response.data)
            toast.success("login success")
            router.push("/profile")

        }catch(error:any){
            console.log("Login failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading?"Processing...":"Login"}</h1>
        <hr />
        <label htmlFor="email" className="block mb-1 mt-4">Email</label>
            <input
                className="border border-gray-300 p-2 rounded text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                placeholder="email"
            />
        <label htmlFor="password" className="block mb-1 mt-4">Password</label>
            <input
                className="border border-gray-300 p-2 rounded text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                placeholder="password"
            />
            <button
                onClick={onLogin}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
            >Login here</button>
            
            <Link 
            href="/signup"
            className="mt-4"
            >Visit signup page</Link>
      </div>
    )
}