/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function SingupPage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    
    const [buttonDisabled,setbuttonDisabled] = React.useState(false)
    const[loading,setLoading] = React.useState(false)

    useEffect(()=>{
       if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setbuttonDisabled(false)
       }else{
            setbuttonDisabled(true)
       }
    },[user])

    const onSingup = async()=>{
        try{
           setLoading(true)
           const response =  await axios.post("/api/users/signup",user)
           console.log("Signup Success:",response.data)
           router.push("/login")

        }catch(error:any){
            console.log("Signup Failed:",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-br from-blue-500 to-purple-500">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {loading ? "Processing..." : "Create an Account"}
            </h1>
            <hr className="border-t-2 border-blue-300 mb-6" />
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                placeholder="Enter your username"
            />
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Email</label>
            <input
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                placeholder="Enter your email"
            />
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Password</label>
            <input
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                placeholder="Enter your password"
            />
            <button
                onClick={onSingup}
                className={`${
                  buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-3 px-4 rounded-lg w-full mt-6 transition duration-300 ease-in-out transform hover:scale-105`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Please fill all fields" : "Sign Up"}
            </button>
            
            <Link 
              href="/login"
              className="block text-center mt-6 text-blue-600 hover:text-blue-700 font-semibold transition duration-200"
            >
              Already have an account? Log in here
            </Link>
        </div>
      </div>
    )
}
