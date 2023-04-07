const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const colors=require('colors');
const { json } = require('express');
const dotenv=require('dotenv').config();

//access-public
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

        if(toasts.length>0) return res.status(400).json(toasts);

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


        

    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

//access-public
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        let toasts=[];
        //checks on the body received from the front end
        if(!password) toasts.push({message: 'A valid password is required ',type:'error'});
        if(password && (password.length<8 || password.length>12)) toasts.push({message: 'Password must be at least 8-12 characters long',type:'error'});
        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid email is required ',type:'error'});
        
        if(toasts.length>0) return res.status(400).json(toasts);

        //first checking weather the user exists or not
        let user=await User.findOne({email});
        if(!user) return res.status(400).json([{message:'User does not exist', type:'error'}])

        //if user exists will varify the password now
        //password is password coming from bidy and user.password is password stored in backend
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(400).json([{message:'Invalid credentials', type:'error'}]);

        //now will create token
        const payload={
            user:{
                id:user._id
            }
        }

        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: 28800
        },(err,token)=>{
            if(err) throw err;
            res.json(token);
        });



    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//access-private
const getProfile=async(req,res)=>{
    try{
        //to access the profile we have to send the token first using get request from front end
        //for that we have to make the middleware

        const user=await User.findById(req.user.id)
        //not sending the password field , __v field , createdAt field , updatedAt field
        .select('-password').select('-__v')
        .select('-createdAt').select('-updatedAt');

        if(!user) return res.status(404).json({message:'User does not exist',type:'error'});
        
        res.json(user);

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