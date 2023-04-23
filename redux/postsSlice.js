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
    }
})

// 
export const { addPost } = postsSlice.actions
export default postsSlice.reducer
