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

    const getBlogById=async()=>{

    }

    const createBlog=async()=>{

    }

    const updateBlog=async()=>{

    }

    const deteleBlog=async()=>{

    }

    const clearErrors=async()=>{

    }

    const clearBlogs=async()=>{
        dispatch({
            type:ActionTypes.CLEAR_BLOGS
        })
    }
    // #endregion

    return (
    <BlogContext.Provider value={{
        blogs: state.blogs,
        currentBlog: state.currentBlog,
        toasts:state.toasts,
        getBlogs,
        getBlogById,
        createBlog,
        updateBlog,
        deteleBlog,
        clearErrors,
        clearBlogs
    }}>
        {props.children}
    </BlogContext.Provider>
    )
}