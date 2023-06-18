import { Base_Url } from "./apiUtils";
import axios from "axios";



export default async function AuthApiCall( path,body) {
    
    return await axios.post(Base_Url + path, body)
}