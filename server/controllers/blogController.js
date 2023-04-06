const Blog =require('../models/Blog');
const colors=require('colors');

//get the blog by user id
//afte the token verification user can only access the blog
//access-private
const getBlog=async(req,res)=>{
    try{
        const blogs=await Blog.find({user:req.user.id});
        res.json(blogs);
    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

//creating the blog
//access-private
const createBlog=async(req,res)=>{
    try{
        const {title,content}=req.body;
        const newBlog=new Blog({
            title,
            content,
            user:req.user.id
        });
        const blog=await newBlog.save();
        res.json(blog);
    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

//updating the blog
//access-private
const updateBlog=async(req,res)=>{
    try{
        const {title,content}=req.body;
        const blog=await Blog.findOneAndUpdate({_id:req.params.id,user:req.user.id},{title,content},{new : true});
        res.json(blog);

    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

//delete blog
//access-private
const deteleBlog=async(req,res)=>{
    try{
        res.send('deleting blog');
    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

module.exports={
    deteleBlog,
    updateBlog,
    createBlog,
    getBlog
}