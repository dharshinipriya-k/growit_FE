import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ProductService } from './ProductService'

export const getAllProducts = createAsyncThunk("product/get", async(thunkAPI) =>{
    try {
        return await ProductService.getProducts()
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
            state.product = action.payload
            state.message = 'Product fetched successfully'
           
        })
        .addCase(getAProduct.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
           
        })
   
   
    }
})


export default productSlice.reducer;