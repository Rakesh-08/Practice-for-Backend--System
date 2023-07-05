import Apis from "./apiUtils";
import axios from "axios";


let postAppointment = async (obj) => {
    
    return await axios.post(Apis.Base_Url + Apis.bookAppointment, obj, {
        headers: {
            "x-access-token":localStorage.getItem("accessToken")
        }
    })
}

let getAllAppointments = async () => {
    return await axios.get(Apis.Base_Url + Apis.getAppointments, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });
    
}

let removeAppointment = async (id) => {
    
    return await axios.delete(Apis.Base_Url + Apis.delAppointment + id, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });
}
export {postAppointment,getAllAppointments,removeAppointment}