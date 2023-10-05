import { createAsyncThunk } from "@reduxjs/toolkit";


export const getPersonThunk = createAsyncThunk("person/getPerson", async (data) => {
    const request = await fetch(`https://fakerapi.it/api/v1/persons?_quantity=${data.len}&_gender=male&_birthday_start=2005-01-01`)
    const json = await request.json()
    return [...json.data, {firstname: data.firstname}]
})