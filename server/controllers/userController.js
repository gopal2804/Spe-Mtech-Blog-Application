const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const colors=require('colors');
const { json } = require('express');
const dotenv=require('dotenv').config();
const logger = require("../utils/logger");

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

        if(toasts.length>0){

            logger.log({
                level: "info",
                message: `Error while registration of username ${email}`,
            });

            return res.status(400).json(toasts);
        } 

        //checking if the user already exists
        let newUser=await User.findOne({email});
        if(newUser){
            logger.log({
                level: "info",
                message: `${email} already exists`,
            });
            return res.status(400).json([{message:'User already exists', type:'error'}]);
        } 

        //or
        //user =new User({firstName:firstName, lastName:lastName, email:email, password:password})
        newUser=new User(req.body);

        //hashing the password
        //10 rounds
        const salt=await bcrypt.genSalt(10);
        newUser.password=await bcrypt.hash(password,salt);

        //now saving the user in database
        await newUser.save();

        logger.log({
            level: "info",
            message: `${email} User created successfully`,
        });


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
        logger.log({
            level: "info",
            message: `Error occured while user registration`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
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
        
        if(toasts.length>0){
            logger.log({
                level: "info",
                message: `Error while login in of username ${email}`,
            });
            return res.status(400).json(toasts);
        } 

        //first checking weather the user exists or not
        let user=await User.findOne({email});
        if(!user){
            logger.log({
                level: "info",
                message: `${email} does not exixst`,
            });
            return res.status(400).json([{message:'User does not exist', type:'error'}])
        } 

        //if user exists will varify the password now
        //password is password coming from bidy and user.password is password stored in backend
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            logger.log({
                level: "info",
                message: `${email} password does not match`,
            });
            return res.status(400).json([{message:'Invalid credentials', type:'error'}]);
        } 

        logger.log({
            level: "info",
            message: `${email} logged in successfully`,
        });

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
        logger.log({
            level: "info",
            message: `Error while login`,
        });
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

        if(!user) 
        {
            logger.log({
                level: "info",
                message: `${user.email} does not exist`,
            });
            return res.status(404).json([{message:'User does not exist',type:'error'}]);

        }   
        
        logger.log({
            level: "info",
            message: `${user.email} profile view`,
        });

        res.json(user);

        

    }catch(error){
        logger.log({
            level: "info",
            message: `Error while profile viewing`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

const updateUser=async(req,res)=>{
    try{    
        const userId=req.params.id;
        if(userId!==req.user.id){
            return res.status(401).json([{message: 'Unauthorized Action', type:'error'}]);
        }

        let user=await User.findOneAndUpdate({_id:userId},req.body,{new:true});

        if(!user) return res.status(404).json([{message: 'User does not exist', type:'error'}]);


        logger.log({
            level: "info",
            message: `${user.email} updated the profile successfully`,
        });

        res.json(user);

        
    }catch(error){
        logger.log({
            level: "info",
            message: `Errro occured while updating the profile`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

function validatedEmail(email){
    const regex=/\S+@\S+\.\S+/;
    return regex.test(email);
}

module.exports={
    registerUser,
    loginUser,
    getProfile,
    updateUser
}