

import axios from "axios";
import Apis from "./apiUtils"
let { Base_Url, getAllHospitals } = Apis;

let token = {
  headers: {
    "x-access-token": localStorage.getItem("accessToken"),
  },
};


let getHospitals = async () => {
     
    return await axios.get(Base_Url + getAllHospitals,token);
}

export {
    getHospitals,
}