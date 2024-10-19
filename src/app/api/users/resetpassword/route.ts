import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request:NextRequest) {
    try{

    const reqBody = await request.json()
    const {token,newPassword} = reqBody
    console.log("This token is of route.ts of resetpassword:", token)

    const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})

    if(!user){
        return NextResponse.json({error:"Invalid or expired token"},{status:400})
    }
    console.log("In route.ts of resetpassword:",user)

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(newPassword,salt)

    user.password = hashedPassword
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save();

    return NextResponse.json({
        message :"Password updated successfully",
        success : true
    })

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}