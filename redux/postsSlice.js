import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((items) => {
                return items.id !== action.payload.id
            })
        },
        editPost: (state, action) => {
            state.posts.map((items) => {
                if(items.id === action.payload.id){
                    if(action.payload.description) return items.description = action.payload.description
                    if(action.payload.done || typeof action.payload.done === "boolean") return items.done = action.payload.done
                    if(action.payload.important || typeof action.payload.important === "boolean") return items.important = action.payload.important
                }
            })
        }
    }
})

// 
export const { addPost, deletePost, editPost } = postsSlice.actions
export default postsSlice.reducer
