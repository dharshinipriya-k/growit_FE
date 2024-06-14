import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { authService } from './UserService'
export const base_url = "http://localhost:8000/api/";

const getToken = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

  export const config = {
    headers: {
        Authorization: `Bearer ${
            getToken !== null ? getToken.token : ""
        }`,
        Accept: "application/json"
    }
  }

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
    console.log(cartData);
    try {
        return await authService.addToCart(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserCart = createAsyncThunk("user/cart/get", async(data,thunkAPI) =>{
    try {
        return await authService.getCart(data)
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

export const placeOrder = createAsyncThunk('user/place-order', async(orderDetails, thunkAPI) => {
    try {
        console.log(orderDetails);
        return await authService.placeOrder(orderDetails)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserOrders = createAsyncThunk("user/orders/get", async(thunkAPI) =>{
    try {
        return await authService.getMyOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateProfile = createAsyncThunk("user/profile/update", async(data, config2, thunkAPI) =>{
    console.log(config2);
    try {
        return await authService.updateUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const forgotPasswordToken = createAsyncThunk("user/password/token", async(data, thunkAPI) =>{
    try {
        return await authService.forgotPassToken(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetPasswordToken = createAsyncThunk("user/password/reset", async(data, thunkAPI) =>{
    try {
        return await authService.resetPassToken(data)
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
                toast.error(`${action.payload.response.data.message }`)
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
                toast.error(`${action.payload.response.data.message}`)
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
                toast.error(`${action.payload.response.data.message}`)
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
        .addCase(placeOrder.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(placeOrder.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.orderInfo = action.payload
        // if(state.isSuccess){
        //     toast.success('Your order has been Placed Successfully!!')
        // }


        })
        .addCase(placeOrder.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if( !state.isSuccess){
            toast.error("Couldn't Place Order")
        }

        })

        .addCase(getUserOrders.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getUserOrders.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.myOrders = action.payload

        })
        .addCase(getUserOrders.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        })

        .addCase(updateProfile.pending, (state)=>{
            state.isLoading = true
            console.log('pending');
        })
        .addCase(updateProfile.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.updatedUser = action.payload
       
            let currentUserData = JSON.parse(localStorage.getItem('customer'))
            console.log(currentUserData);
            let newUserData = {
                _id: currentUserData?.id,
                token: currentUserData?.token,
                firstName: action?.payload?.firstName,
                lastName: action?.payload?.lastName,
                mobile: action?.payload?.mobile,
                email: action?.payload?.email

            }
            console.log(JSON.stringify(newUserData));
            localStorage.setItem('customer',JSON.stringify(newUserData))
            state.user = newUserData
            toast.success('Profile updated Successfully')
        

        })
        .addCase(updateProfile.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if( !state.isSuccess){
            toast.error('Profile updation failed!')
        }
        })

        .addCase(forgotPasswordToken.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(forgotPasswordToken.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.token = action.payload
        if(state.isSuccess){
            toast.success('Email Sent to the entered Email ID')
        }

        })
        .addCase(forgotPasswordToken.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if( !state.isSuccess){
            toast.error('Something went wrong! Try again!')
        }
        })

        .addCase(resetPasswordToken.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(resetPasswordToken.fulfilled,(state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true  
        state.passWord = action.payload
        if(state.isSuccess){
            toast.success('Password Updated Successfully')
        }

        })
        .addCase(resetPasswordToken.rejected, (state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if( !state.isSuccess){
            toast.error('Something went wrong! Try again!')
        }
        })
    }
})

export default authSlice.reducer;