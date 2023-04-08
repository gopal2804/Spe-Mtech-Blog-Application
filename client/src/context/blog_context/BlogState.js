import { createContext,useReducer } from "react";
import axios from 'axios';
import BlogReducer from "./BlogReducer";
import * as ActionTypes from '../ContextActions';

export const BlogContext=createContext();

export default function BlogState(props){
    const initialState={
        blogs: null,
        currentBlog: null,
        toasts: null,
        blogCreated: false
    }

    const [state,dispatch] = useReducer(BlogReducer,initialState);

    const config={
        headers: {
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }

    }

    // #regionbegin ----------------------actions------------------
    
    //all blogs
    const getBlogs=async()=>{
        try{
            const res=await axios.get('/api/blogs/view',config);
            dispatch({
                type: ActionTypes.GET_BLOGS_SUCCESS,
                payload:res.data
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.BLOGS_FAIL,
                payload:error.response.data
            })
        }
    }

    const getBlogById=async(blogId)=>{
        try{
            const res=await axios.get(`/api/blogs/${blogId}`,config);
            dispatch({
                type: ActionTypes.GET_BLOG_BY_ID,
                payload: res.data
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.BLOGS_FAIL,
                payload:error.response.data
            })
        }
    }

    const createBlog=async(blogData)=>{
        try{
            const res=await axios.post('/api/blogs/create',blogData,config);
            dispatch({
                type: ActionTypes.NEW_BLOG_SUCCESS,
                payload: res.data
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.BLOGS_FAIL,
                payload: error.response.data
            })
        }
    }

    const updateBlog=async(blogData)=>{
        try{
            const res=await axios.put(`/api/blogs/update/${blogData._id}`,blogData,config);
            dispatch({
                type:ActionTypes.UPDATE_BLOG_SUCCESS,
                payload:res.data
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type:ActionTypes.BLOGS_FAIL,
                payload: error.response.data
            })
        }
    }

    const deleteBlog=async(blogId)=>{
        try{
            const res=await axios.delete(`/api/blogs/delete/${blogId}`,config);
            dispatch({
                type: ActionTypes.BLOG_DELETE,
                payload: res.data
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type:ActionTypes.BLOGS_FAIL,
                payload: error.response.data
            }) 
        }
    }

    const clearErrors=async()=>{
        dispatch({
            type: ActionTypes.CLEAR_ERRORS
        })
    }   

    const clearBlogs=async()=>{
        dispatch({
            type:ActionTypes.CLEAR_BLOGS
        })
    }

    const clearCurrentBlog=()=>{
        dispatch({
            type: ActionTypes.CLEAR_CURRENT_BLOG
        })
    }
    // #endregion

    return (
    <BlogContext.Provider value={{
        blogs: state.blogs,
        currentBlog: state.currentBlog,
        toasts: state.toasts,
        blogCreated: state.blogCreated,

        clearCurrentBlog,
        getBlogs,
        getBlogById,
        createBlog,
        updateBlog,
        deleteBlog,
        clearErrors,
        clearBlogs
    }}>
        {props.children}
    </BlogContext.Provider>
    )
}