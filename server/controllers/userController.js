const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const colors=require('colors');
const dotenv=require('dotenv').config();

const registerUser=async(req,res)=>{
    try{
        const { firstName, lastName, email, password}=req.body;

        //user data checks(checks on data coming from front end)
        let toasts=[];
        if(!firstName) toasts.push({message: 'First name is required ',type:'error'});
        if(!lastName) toasts.push({message: 'Last name is required ',type:'error'});

        if(!password) toasts.push({message: 'A valid password is required ',type:'error'});
        if(password && (password.length<8 || password.length>12)) toasts.push({message: 'Password must be at least 8-12 characters long',type:'error'});


        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid email is required ',type:'error'});

        if(toasts.length>0) return res.status(400).json({toasts});

        //checking if the user already exists
        let newUser=await User.findOne({email});
        if(newUser) return res.status(400).json([{message:'User already exists', type:'error'}]);

        //or
        //user =new User({firstName:firstName, lastName:lastName, email:email, password:password})
        newUser=new User(req.body);

        //hashing the password
        //10 rounds
        const salt=await bcrypt.genSalt(10);
        newUser.password=await bcrypt.hash(password,salt);

        //now saving the user in database
        await newUser.save();

        //after saving will return the token to client
        const payload={
            user:{
                id: newUser._id
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{
            //will expire every 8 hours , time in sec
            expiresIn: 28800
        },(err,token)=>{
            if(err) throw err;
            res.json(token);
        });




        res.json(newUser);
        

    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

const loginUser=async(req,res)=>{
    try{

    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

const getProfile=async(req,res)=>{
    try{

    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

function validatedEmail(email){
    const regex=/\S+@\S+\.\S+/;
    return regex.test(email);
}

module.exports={
    registerUser,
    loginUser,
    getProfile
}