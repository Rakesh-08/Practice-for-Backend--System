import Apis from "./apiUtils";
import axios from "axios";

let token= {
        headers: {
            "x-access-token":localStorage.getItem("accessToken")
        }
    }

let postAppointment = async (obj) => {
    
    return await axios.post(Apis.Base_Url + Apis.bookAppointment, obj,token)
}

let getAllAppointments = async () => {
    return await axios.get(Apis.Base_Url + Apis.getAppointments, token);
    
}

let removeAppointment = async (id) => {
    
    return await axios.delete(Apis.Base_Url + Apis.delAppointment + id,token);
}

let editAppointment = async (id, obj)=>{
   return await axios.put(Apis.Base_Url + Apis.editAppointment + id,obj,token);

}
export {postAppointment,getAllAppointments,removeAppointment,editAppointment}