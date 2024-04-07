import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { EnquiryService } from './ContactService'

export const createEnquiry = createAsyncThunk("contact/post", async(contactData,thunkAPI) =>{
    console.log(contactData);
    try {
        return await EnquiryService.postEnquiry(contactData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const contactState = {
    contact: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEnquiry.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createEnquiry.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.contact = action.payload
            if(state.isSuccess === true){
                toast.success('Contact Form Submitted Successfully')
            }
           
        })
        .addCase(createEnquiry.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            if(state.isSuccess === false){
                toast.error('Something went wrong')
            }
           
        })
   
    }
})


export default contactSlice.reducer;