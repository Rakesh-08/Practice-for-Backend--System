import Apis from "./apiUtils";
import axios from "axios";


let postAppointment = async (obj) => {
    
    return await axios.post(Apis.Base_Url + Apis.bookAppointment, obj, {
        headers: {
            "x-access-token":localStorage.getItem("accessToken")
        }
    })
}
export {postAppointment}