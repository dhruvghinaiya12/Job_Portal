const nodemailer=require('nodemailer')
require("dotenv").config()

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

const sendEmail=async(to,subject,body)=>{
    const mailoptions={
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        html:body
    }
    try {
        let mail=await transport.sendMail(mailoptions)
        console.log('Email sent successfully to '+ mail )
        // console.log(mail);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=sendEmail