import axios from "axios";
import { base_url } from "../../utils/AxiosConfig";

const getBlogs = async()=>{
    const response = await axios.get(`${base_url}blogs/all-blogs`)
    // console.log(response);
    if(response.data){
        return response.data
    }
}

const getABlog = async(id)=>{
    const response = await axios.get(`${base_url}blogs/get-blog/${id}`)
    // console.log(response);
    if(response.data){
        return response.data
    }
}

export const blogService = {
    getBlogs,
    getABlog
}