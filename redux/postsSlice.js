import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: typeof window !== 'undefined' && localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [],
    },
    reducers: {
        addPost: (state, action) => {
            localStorage.setItem('userList', JSON.stringify([...state.posts, action.payload]))
            return {...state, posts: [...state.posts, action.payload]}
        },
        deletePost: (state, action) => {
            const filteredPosts = state.posts.filter((items) => {
                return items.id !== action.payload.id
            })
            localStorage.setItem('userList', JSON.stringify([...filteredPosts]))
            return {...state, posts: [...filteredPosts]}
        },
        deleteAll: (state, action) => {
            state.posts = []
            localStorage.removeItem('userList')
        },
        editPost: (state, action) => {
            state.posts.map((items) => {
                if(items.id === action.payload.id){
                    if(action.payload.description){
                        return items.description = action.payload.description
                    }
                    if(action.payload.done || typeof action.payload.done === "boolean"){
                        return items.done = action.payload.done
                    }
                    if(action.payload.important || typeof action.payload.important === "boolean"){
                        return items.important = action.payload.important
                    }
                }
            })
            localStorage.setItem('userList', JSON.stringify([...state.posts]))
        }
    }
})

// 
export const { addPost, deletePost, deleteAll, editPost } = postsSlice.actions
export default postsSlice.reducer
