import Apis from "./apiUtils";
import axios from "axios";



export default async function AuthApiCall( path,body) {
    
    return await axios.post(Apis.Base_Url + path, body)
}