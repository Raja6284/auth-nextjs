/* eslint-disable @typescript-eslint/no-unused-vars */
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try{
       const reqBody = await request.json()
       const {email,password} = reqBody
        console.log(reqBody)

        //check if user exist
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"user not found"},{status:400})
        }
        console.log("User exists")

        //check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }

        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        //create token
        const token = await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            {expiresIn:"1d"}
        )
        //console.log(token)
        const response = NextResponse.json({
            message:"Login successful",
            success:true
        })

        // response.cookies.set("token",token,{
        //     httpOnly:true
        // })

        // Set token in cookie
        response.cookies.set("token", token, {
            httpOnly: true,           // Ensure it cannot be accessed by JS
            //secure: process.env.NODE_ENV === "production", // Secure in production
            maxAge: 60 * 60 * 24,     // Expires in 1 day
            //path: "/",                // Accessible across the app
            //sameSite: "strict",       // Prevent CSRF
        });
        console.log("this is response cookies: ",response.cookies)
        return response

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}