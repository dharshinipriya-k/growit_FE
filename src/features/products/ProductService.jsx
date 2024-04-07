import axios from "axios";
import { base_url } from "../../utils/AxiosConfig";

const getProducts = async()=>{
    const response = await axios.get(`${base_url}product`)
    // console.log(response);
    if(response.data){
        return response.data
    }
}

const getSingleProduct = async(id)=>{
    const response = await axios.get(`${base_url}product/${id}`)
    // console.log(response);
    if(response.data){
        return response.data
    }
}

export const ProductService = {
    getProducts,
    getSingleProduct
}