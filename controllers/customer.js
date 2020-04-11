const nodemailer = require('nodemailer');
const sequelize = require('../utils/database');
const Customer = require('../Models/customers');
const {check,validationResult} = require('express-validator');

exports.getOtp = (req,res)=>{
    res.render('login');
}


exports.postOtp = async(req,res)=>{
    try {
        const email = req.body.email || req.query.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0].msg });
        }
        
        const expiryTime  = 24*60*60*1000;
        const customer = await Customer.findOne({where:{email:email}});
        if(customer && customer.dataValues.count===2){
            const date = new Date(customer.dataValues.updatedAt);
            if(Date.now()-date.getTime()<=expiryTime){
                throw new Error("You have Exceeded your Max limits");
            }
            await customer.update({count:0},{where:{email:email}});
    }

        const otp = Math.floor(100000+Math.random()*100000)
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
            user:"enter your email id",
            pass:"enter your password"
        }
    });
    
    const mailOptions = {
        from:"nishitarora.zapbuild@gmail.com",
        to:email,
        subject:'OTP verification',
        text:`Your OTP for registeration is ${otp}`
    }
    
    transporter.sendMail(mailOptions,async(err,info)=>{
        if(err){
            throw new Error(err.message);
        }
        else if(!customer){
            await Customer.create({email,otp,count:1})
         return res.redirect(`/verify?email=${email}`)
            
        }
        await Customer.update({otp:otp,count:customer.dataValues.count+1},{where:{email:email}});    
     return res.redirect(`/verify?email=${email}`)
    })

    } catch (error) {
        res.end(error.message);
    }
    
}

exports.getVerify = (req,res)=>{
    const email = req.query.email;
    console.log(email);
    res.render('verify',{
        email:email
    });
}

exports.postVerify = async(req,res)=>{
    try {
        const {otp} = req.body;
        const email = req.query.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0].msg });
        }
        const customer =  await Customer.findOne({where:{email:email}});
        const time = customer.dataValues.updatedAt;
        let date = new Date(time);
        const expiryTime = 10*60*1000;
        if(Date.now()-date.getTime()>=expiryTime){
            throw new Error("OTP expired");
        }
        if(otp==customer.dataValues.otp){
            res.end("<h1>OTP successfully verified</h1>")
        }
        throw new Error("Invalid OTP please TRY again");
        } catch (error) {
        res.end(error.message);
    }
}