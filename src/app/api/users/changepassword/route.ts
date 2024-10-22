import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {newpassword,token}= reqBody

        // if(newpassword !== confirmpassword){
        //     return NextResponse.json({error:"entered mis-match passwrd"},{status:400})
        // }

        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})

        if(!user){
            return NextResponse.json({error:"Invalid or expired token"},{status:400})
        }

        //hashing the password
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newpassword,salt)

        user.password = hashedPassword
        user.forgotPasswordToken=undefined
        user.forgotPasswordTokenExpiry=undefined

        await user.save()

        return NextResponse.json({
            message:"Password changed successfully",
            success:true
        })

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}