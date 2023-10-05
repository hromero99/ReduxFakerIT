import { createSlice } from "@reduxjs/toolkit";
import { getPersonThunk } from "./personThunks";



export const personSlice = createSlice({
    name: "person",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {
        addPerson: (state,action) => {
            state.data = [...state.data,action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPersonThunk.pending, (state,action) => {
            state.status = "pending"
        }).addCase(getPersonThunk.rejected,(state,action) => {
            state.status = "rejected"
            state.error = action.error.message
        }).addCase(getPersonThunk.fulfilled,(state,action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
    }
});

export const {addPerson} = personSlice.actions
export const getPersonData = (state) => state.person.data
export const getPersonStatus = (state) => state.person.status
export const getPersonError = (state) => state.person.error