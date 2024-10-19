/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel"

export const sendEmail = async({email,emailType,userId}:any)=>{
    try{

        //create a hashed Token
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        console.log("This is the hashed token",typeof(hashedToken),hashedToken)
        //updating tonken and expiry on the basis of VERIFY and RESET 
        if(emailType === 'VERIFY'){
            const user = await User.findByIdAndUpdate(userId,
                {verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000},
                { new: true }
            )
            
            console.log("This is updated user:",user)
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000}
            )
        }
        

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "2d074186f105d2",
            pass: "2b53ce2d65f20a"
            }
        });

        const mailOptions = {
            from:"onlydealforyou@gmail.com",
            to:email,
            subject:emailType==='VERIFY'?"Verify you email":"Reset you password",
            
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse =  await transport.sendMail(mailOptions)

        return mailResponse


    }catch(error:any){
        throw new Error(error.message)
    }
}