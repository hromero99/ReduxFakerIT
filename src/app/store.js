import { configureStore } from "@reduxjs/toolkit";
import { personSlice } from "../features/person/personSlice";


export const store = configureStore({
    reducer: {
        person: personSlice.reducer
    }
})