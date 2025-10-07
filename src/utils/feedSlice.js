import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers:{
        addfeed:(state, action)=>{
            return action.payload;
        },
        removefromfeed:(state, action)=>{
            const newArray = state.filter(r=> r._id !== action.payload)
            return newArray;
        }
    }
});

export const {addfeed, removefromfeed} = feedSlice.actions;
export default feedSlice.reducer;