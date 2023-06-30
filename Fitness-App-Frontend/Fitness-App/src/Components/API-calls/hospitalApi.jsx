

import axios from "axios";
import Apis from "./apiUtils"
let {Base_Url,getAllHospitals}=Apis

let getHospitals = async () => {
     
    return await axios.get(Base_Url + getAllHospitals, {
        headers: {
            "x-access-token":localStorage.getItem("accessToken")
        }
    });
}

export {
    getHospitals,
}