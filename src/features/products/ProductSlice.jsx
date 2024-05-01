import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ProductService } from './ProductService'

export const getAllProducts = createAsyncThunk("product/get", async(data, thunkAPI) =>{
    try {
        return await ProductService.getProducts(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAProduct = createAsyncThunk("product/get-one", async(id,thunkAPI) =>{
    try {
        return await ProductService.getSingleProduct(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addRating = createAsyncThunk("product/rating", async(data,thunkAPI) =>{
    try {
        return await ProductService.rateProduct(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const productState = {
    products: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


export const productSlice = createSlice({
    name: "products",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.products = action.payload
           
        })
        .addCase(getAllProducts.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
           
        })
        .addCase(getAProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAProduct.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.singleProduct  = action.payload
            state.message = 'Product fetched successfully'
           
        })
        .addCase(getAProduct.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
           
        })

        .addCase(addRating.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(addRating.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.rating = action.payload
            state.message = 'Your rating has been submitted'
            if(state.isSuccess){
                toast.success("Your review has been submitted.!")
            }
           
        })
        .addCase(addRating.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            if( !state.isSuccess){
                toast.error('Failed to submit review!')
            }
           
        })
   
   
    }
})


export default productSlice.reducer;