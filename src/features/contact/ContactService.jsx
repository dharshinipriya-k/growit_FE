import axios from "axios";
import { base_url } from "../../utils/AxiosConfig";

const postEnquiry = async(contactData)=>{
    const response = await axios.post(`${base_url}enquiry/create`,contactData)
    // console.log(response);
    if(response.data){
        return response.data
    }
}

export const EnquiryService = {
    postEnquiry
}