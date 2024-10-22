import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {email} = reqBody
        console.log("This is the entered email: ",email)

        const user = await User.findOne({email:email})

        if(!user){
            return NextResponse.json({error:"Please enter the correct email"},{status:400})
        }

        //sending resetPasswrod email
        const verifyEmailInfo = await sendEmail({email,emailType:'RESET',userId:user._id})
        console.log("resetpasswrod email sent: ",verifyEmailInfo)

        return NextResponse.json({
            message:"Reset password email sent successfully",
            success:true
        })


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
