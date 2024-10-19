import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";

connect()

export async function POST(request:NextRequest){

    try{
    const reqBody = await request.json()
    const {token} = reqBody
    console.log("Thsi token is of route.ts of verifyemail:", token)

    const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

    if(!user){
        return NextResponse.json({error:"Invalid or expired token"},{status:400})
    }
    console.log("In route.ts of verifyemail:",user)

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save();

    return NextResponse.json({
        message :"email verified successfully",
        success : true
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}