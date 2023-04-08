const express=require('express');
const router=express.Router();
const auth=require('../middleware/authMiddleware');

const{
    registerUser,
    loginUser,
    getProfile,
    updateUser
}=require('../controllers/userController');

router.post('/register',registerUser);

router.post('/login',loginUser);

//passing auth here in order to privatising the profile 
//during this api call , first it will go through the middleware and verify weather the token exists or not and if exists then it will check weather the token is correct or not
//then will go to the controller
//it valid token then it will return the user
router.get('/profile',[auth],getProfile);

router.put('/update/:id',[auth],updateUser);

module.exports=router;