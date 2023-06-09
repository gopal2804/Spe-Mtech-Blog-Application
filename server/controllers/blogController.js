const Blog =require('../models/Blog');
const colors=require('colors');
const logger = require("../utils/logger");


//get the blog by user id
//afte the token verification user can only access the blog
//access-private
const getBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({user:req.user.id});

        logger.log({
            level: "info",
            message: `Blog retrieved successfully`,
        });

        res.json(blogs);

        

    }catch(error){
        logger.log({
            level: "info",
            message: `Error while accessing the blogs`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({});
        // console.log(blogs[1].title)
        res.json(blogs);
    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const getBlogById=async(req,res)=>{
    try{
        const blog=await Blog.findOne({_id:req.params.id, user:req.user.id});
        if(!blog) 
        {
            logger.log({
                level: "info",
                message: `Blog with id ${blog.id} does not exist`,
            });

            return res.status(404).json([
                {
                    message: 'Blog not found',
                    type: 'error'
                }
            ])
        }
        
        logger.log({
            level: "info",
            message: `Blog with id ${blog.id} retrieved successfully`,
        });
        res.json(blog);

        

    }catch(error){
        logger.log({
            level: "info",
            message: `Error while accessing the blog`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
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
        await newBlog.save();

        //if some error arised while saving the blog
        if(!newBlog) 
        {
            logger.log({
                level: "info",
                message: `Blog not created`,
            });
            return res.status(400).json([{message: 'Blog not created', type:'error'}]);
        }
        

        logger.log({
            level: "info",
            message: `Blog created successfully`,
        });

        res.json(newBlog);

        

    }catch(error){
        logger.log({
            level: "info",
            message: `Error while creating the blog`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//updating the blog
//access-private
const updateBlog=async(req,res)=>{
    try{
        const {title,content}=req.body;
        //passing user id for token and blog id for searching
        //after updating will return a new object
        //blog id is coming from front end (from url)
        logger.log({
            level: "info",
            message: `Blog Updated successfully`,
        });
        const blog=await Blog.findOneAndUpdate({_id:req.params.id,user:req.user.id},{title,content},{new : true});  
        res.json(blog);

        

    }catch(error){
        logger.log({
            level: "info",
            message: `Error while updating the blog`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.statu(500).send('Server Error');
    }
}

//delete blog
//access-private
const deleteBlog=async(req,res)=>{
    try{

        const blog=await Blog.findOneAndDelete({_id:req.params.id,user:req.user.id});
        logger.log({
            level: "info",
            message: `Blog deleted successfully`,
        });
        res.json({
            blogId: req.params.id,
            toasts: [{message:'Blog deleted successfully',type:'success'}]});

        
    }catch(error){
        logger.log({
            level: "info",
            message: `Error while deleting the blog`,
        });
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

module.exports={
    deleteBlog,
    updateBlog,
    createBlog,
    getBlogs,
    getBlogById,
    getAllBlogs 
}
