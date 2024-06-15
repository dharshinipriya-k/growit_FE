import axios from "axios";
import { base_url, config } from "../../utils/AxiosConfig";

const getToken = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

  export const config2 = {
    headers: {
        Authorization: `Bearer ${
            getToken !== null ? getToken.token : ""
        }`,
        Accept: "application/json"
    }
  }

const register = async(userData)=>{
    const response = await axios.post(`${base_url}user/register`, userData)
    if(response.data){
        localStorage.setItem('customer',JSON.stringify(response.data))
        return response.data
    }
}

const login = async(userData)=>{
    const response = await axios.post(`${base_url}user/login`, userData)
    if(response.data){
        localStorage.setItem('customer', JSON.stringify(response.data))
        return response.data
        
    }
}

const addToCart = async(cartData) => {
    const response = await axios.post(`${base_url}user/cart`, cartData, config)
    console.log(response);
    if(response.data){
        return response.data
    }
}

const getCart = async(data) => {
    const response = await axios.get(`${base_url}user/cart`,data, config)
    if(response.data){
        return response.data
    }
    
}

const removeFromCart = async(cartItemId) => {

    const response = await axios.delete(`${base_url}user/delete-cart/${cartItemId}`,config)
    if(response.data){
        return response.data
    }
}

const updateCartQuantity = async(cartData) => {

        const response = await axios.delete(`${base_url}user/update-prod-cart/${cartData.cartItemId}/${cartData.quantity}`,config)
        if(response.data){
            return response.data
        }
    }

 const placeOrder = async(orderData) => {
        console.log(orderData);
            const response = await axios.post(`${base_url}user/cart/create-order`,orderData,config)
            if(response.data){
                return response.data
            }
}


const getMyOrders = async() => {
    const response = await axios.get(`${base_url}user/get-my-orders`, config)
    if(response.data){
        return response.data
    }
}

const updateUser = async(data) => {
    const response = await axios.put(`${base_url}user/edit`,data.data, data.config2)
    if(response.data){
        return response.data
    }
}

const forgotPassToken =  async (data) => {
    const response = await axios.post(`${base_url}user/forgot-password`,data)
    if(response.data){
        return response.data
    }
}

const resetPassToken =  async (data) => {
    console.log('error in reset axios');
    const response = await axios.put(`https://backend-growit.onrender.com/api/user/reset-password/${data.token}`,{password: data?.password})
    if(response.data){
        return response.data
    }
}


export const authService = {
    register,
    login,
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    getMyOrders,
    updateUser,
    forgotPassToken,
    resetPassToken
}