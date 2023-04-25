import { createContext,useReducer } from "react";
import axios from 'axios';
import authReducer from './authReducer';
import * as ActionTypes from '../ContextActions';


export const AuthContext=createContext();

let PORT=31670

export default function AuthState(props){

    const initialState={
        token: localStorage.getItem('token'),
        currentUser:null,
        toasts: null,
        isAuthenticated: null
    };

    const [state,dispatch] =useReducer(authReducer,initialState);

    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }

    // #reginbegin ---------------ACTIONS---------------
    const registerUser=async(userData)=>{
        try{
            // const res=await axios.post('http://localhost:5000/api/users/register',userData,config);
            //for kubernetes
            const res=await axios.post(`http://192.168.58.2:${PORT}/api/users/register`,userData,config);
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload:res.data,
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.REGISTER_FAIL,
                payload:error.response.data

            })
        }
    }

    const loginUser=async(userData)=>{
        try{
            // const res=await axios.post('http://localhost:5000/api/users/login',userData,config);
            // console.log(`http://192.168.58.2:${PORT}/api/users/login`);
            // console.log(`${PORT}`)
            const res=await axios.post(`http://192.168.58.2:${PORT}/api/users/login`,userData,config);
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload:res.data,
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload:error.response.data

            })
        }
    }


    const logoutUser=async()=>{
        dispatch({
            type: ActionTypes.LOGOUT
        })
    }

    const clearErrors=()=>{
        dispatch({
            type: ActionTypes.CLEAR_ERRORS
        })
    }

    const getProfile=async()=>{
        try{
            // const res=await axios.get('http://localhost:5000/api/users/profile',config);
            const res=await axios.get(`http://192.168.58.2:${PORT}/api/users/profile`,config);
            dispatch({
                type: ActionTypes.SET_CURRENT_USER,
                payload:res.data,
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload:error.response.data

            })
        }
    }

    const updateUser=async(userData)=>{
        try{
            // const res=await axios.put(`http://localhost:5000/api/users/update/${userData._id}`,userData,config);
            const res=await axios.put(`http://192.168.58.2:${PORT}/api/users/update/${userData._id}`,userData,config);
            dispatch({
                type: ActionTypes.SET_CURRENT_USER,
                payload:res.data,
            })
        }catch(error){
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload:error.response.data

            })
        }
    }
    // #endregion


    return(
        <AuthContext.Provider value={{
            token: state.token,
            currentUser: state.currentUser,
            toasts: state.toasts,
            isAuthenticated: state.isAuthenticated,
            registerUser,
            loginUser,
            logoutUser,
            clearErrors,
            getProfile,
            updateUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}