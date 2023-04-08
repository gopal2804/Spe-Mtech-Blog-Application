import * as ActionTypes from '../ContextActions'

export default (state,action)=>{
    switch(action.type){

        case ActionTypes.NEW_BLOG_SUCCESS:
            let blogs=state.blogs ? state.blogs: [];
            return {
                ...state,
                currentBlog: action.payload,
                blogCreated: true,
                blogs: [...blogs,action.payload]
            }
        case ActionTypes.GET_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: action.payload
            }
        case ActionTypes.BLOGS_FAIL:
            return{
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_BLOG_SUCCESS:
            return{
                ...state,
                currentBlog:action.payload,
                blogs: state.blogs.map(blog=>blog._id===action.payload._id ? action.payload: blog)
            }
        case ActionTypes.BLOG_DELETE:
            return {
                ...state,
                blogs: state.blogs.filter(blog=>blog._id!==action.payload.blogId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_BLOG_BY_ID:
            return {
                ...state,
                currentBlog:action.payload
            }
        case ActionTypes.CLEAR_ERRORS:
            return{
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_BLOGS:
            return{
                ...state,
                blogs:null,
                currentBlog:null,
                blogCreated:false,
                toasts:null  
            }
        case ActionTypes.CLEAR_CURRENT_BLOG:
            return{
                ...state,
                currentBlog:null,
                blogCreated: false
            }
        default:
            return state;
    }
}