const express=require('express');
const router=express.Router();
const auth=require('../middleware/authMiddleware');

const{
    getBlogs,
    createBlog,   
    updateBlog,
    deleteBlog,
    getBlogById
}=require('../controllers/blogController');

router.get('/view',[auth],getBlogs);

router.post('/create',[auth],createBlog);

router.put('/update/:id',[auth],updateBlog);

router.delete('/delete/:id',[auth],deleteBlog);

router.get('/:id',[auth],getBlogById);


module.exports=router;