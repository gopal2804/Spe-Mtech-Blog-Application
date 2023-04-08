const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();

module.exports=function (req,res,next){
    //check for the token
    //get it from the header
    const token=req.header('x-auth-token');

    //check if not token
    if(!token) return res.status(400).json([{message:'No token, authorization denied',type:'error'}]);

    //varify token
    try{
        //decoding the token using our secret key
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //now accessing the user
        req.user=decoded.user;
        //next function will pass the flow to getProfile function in controller
        next();
    }catch(error){
        //401 indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
        //401 means token is not valid
        res.status(401).json([{message:'Token is not valid',type:'error'}]);
    }

}