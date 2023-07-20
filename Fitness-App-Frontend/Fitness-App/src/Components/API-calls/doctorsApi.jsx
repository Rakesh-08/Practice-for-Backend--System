import axios from "axios";
import Apis from "./apiUtils";

let token = {
  headers: {
    "x-access-token": localStorage.getItem("accessToken"),
  },
};



 async function postDoctorRecord( body) {
  return await axios.post(Apis.Base_Url + Apis.postDoctor, body,token);
}
 
let getDoctors = async () => {
       return await axios.get(Apis.Base_Url+Apis.getAllDoctors ,token)
}


export{ postDoctorRecord,getDoctors}


