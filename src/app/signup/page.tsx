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
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading?"Processing...":"Signup"}</h1>
        <hr />
        <label htmlFor="username" className="block mb-1 mt-4">Username</label>
            <input
                className="border border-gray-300 p-2 rounded text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                placeholder="username"
            />
        <label htmlFor="email" className="block mb-1 mt-4">Email</label>
            <input
                className="border border-gray-300 p-2 rounded text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                placeholder="email"
            />
        <label htmlFor="passowrd" className="block mb-1 mt-4">Password</label>
            <input
                className="border border-gray-300 p-2 rounded text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                placeholder="password"
            />
            <button
                onClick={onSingup}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
            >{buttonDisabled?"No Signup":"Signup here"}</button>
            
            <Link 
            href="/login"
            className="mt-4"
            >Visit login page</Link>
      </div>
    )
}