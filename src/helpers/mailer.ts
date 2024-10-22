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
            
            //console.log("This is updated user:",user)
        }else if(emailType === 'RESET'){
            const user = await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000},
                {new:true}
            )
            console.log("updated user for reset:",user)
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

        let mailResponse;
        let mailOptions;
        if(emailType === 'VERIFY'){
            mailOptions = {
                from:"onlydealforyou@gmail.com",
                to:email,
                subject:"Verify you email",
                
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`
            }
    
            mailResponse =  await transport.sendMail(mailOptions)
        }

        if(emailType === 'RESET'){
            mailOptions = {
                from:"onlydealforyou@gmail.com",
                to:email,
                subject:"Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/changepassword?token=${hashedToken}">here</a> to Reset your password
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/changepassword?token=${hashedToken}
                </p>`
            }
    
            mailResponse =  await transport.sendMail(mailOptions)
        }
        

        return mailResponse


    }catch(error:any){
        throw new Error(error.message)
    }
}