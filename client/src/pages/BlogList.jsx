import React, {useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer'
import { toast } from 'react-toastify';
import { useBlog } from '../middleware/ContextHooks'

export default function BlogList() {
  const {getBlogs,toasts,clearErrors,blogs}=useBlog();
  const [myBlogs,setMyBlogs]=useState([]);

  useEffect(()=>{
    if(!blogs){
      getBlogs()
    }else{
      setMyBlogs(blogs)
    }

    if(toasts){
      toasts.forEach(ele => {
        toast(ele.message,{type:ele.type})
      });
      clearErrors();
    }


  },[toasts,clearErrors,blogs,getBlogs])

  return (
    <MainContainer>
        
    </MainContainer>
  )
}
