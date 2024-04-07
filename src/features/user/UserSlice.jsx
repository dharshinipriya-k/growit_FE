import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { authService } from './UserService'

export const registerUser = createAsyncThunk("auth/register", async(userData,thunkAPI) =>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const login = createAsyncThunk("auth/login", async(userData,thunkAPI) =>{
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk("user/cart/add", async(cartData,thunkAPI) =>{
    try {
        return await authService.addToCart(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserCart = createAsyncThunk("user/cart/get", async(thunkAPI) =>{
    try {
        return await authService.getCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeFromCart = createAsyncThunk("user/cart/remove", async(cartItemId,thunkAPI) =>{
    try {
        return await authService.removeFromCart(cartItemId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const UpdateCart = createAsyncThunk("user/cart/update", async(cartData,thunkAPI) =>{
    try {
        return await authService.updateCartQuantity(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const getCustomerFromLocal = localStorage.getItem('customer')
? JSON.parse(localStorage.getItem('customer'))
: null

console.log(getCustomerFromLocal);

const initialState = {
    user: getCustomerFromLocal,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.createdUser = action.payload
            if(state.isSuccess === true){
                toast.info('User Created successfully')
            }
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            if(state.isError === true){
                toast.error(action.error)
            }
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.user = action.payload
            
            if(state.isSuccess === true){
                localStorage.setItem('token', action.payload.token)
                toast.info('Logged In successfully')
            }
        })
        .addCase(login.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            if(state.isError === true){
                toast.error('Invalid credentials')
            }
        })

        .addCase(addToCart.pending, (state)=>{
                state.isLoading = true
            })
        .addCase(addToCart.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true  
            state.cartProd = action.payload
            if(state.isSuccess === true){
                toast.success('Product Added to Cart')
            }
        })
        .addCase(addToCart.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            if(state.isSuccess === false){
                toast.error('Session expired! Login again!')
            }
            
        })
    .addCase(getUserCart.pending, (state)=>{
            state.isLoading = true
        })
    .addCase(getUserCart.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.cartItems = action.payload
        
    })
    .addCase(getUserCart.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        
    })

 .addCase(removeFromCart.pending, (state)=>{
        state.isLoading = true
        })
    .addCase(removeFromCart.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.deletedProd = action.payload
        if(state.isSuccess){
            toast.success('Product deleted from Cart!')
        }
        
    })
    .addCase(removeFromCart.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if( !state.isSuccess){
            toast.error('Something went wrong!!')
        }
        
    })

    .addCase(UpdateCart.pending, (state)=>{
        state.isLoading = true
    })
.addCase(UpdateCart.fulfilled,(state, action) => {
    state.isLoading = false
    state.isError = false
    state.isSuccess = true  
    state.updatedCart = action.payload
    if(state.isSuccess){
        toast.success('Cart Updated!')
    }
    
    
})
.addCase(UpdateCart.rejected, (state,action)=>{
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.error
    if( !state.isSuccess){
        toast.error('Something went wrong!!')
    }
    
})

    }
})


export default authSlice.reducer;