import axios from "axios";
import { base_url, config } from "../../utils/AxiosConfig";

const getProducts = async(data)=>{
    const response = await axios.get(`${base_url}product?${data?.category?`category=${data?.category}&&`:""}`)
    if(response.data){
        return response.data
    }
}

const getSingleProduct = async(id)=>{
    const response = await axios.get(`${base_url}product/${id}`)
    if(response.data){
        return response.data
    }
}

const rateProduct = async(data)=>{
    const response = await axios.put(`${base_url}product/rating`, data, config)
    console.log('Rating added');
    if(response.data){
        return response.data
    }
}

export const ProductService = {
    getProducts,
    getSingleProduct,
    rateProduct
}