import axios from "axios";
import Apis from "./apiUtils";

let token = {
  headers: {
    "x-access-token": localStorage.getItem("accessToken"),
  },
};


 
let getPatients = async () => {
  return await axios.get(Apis.Base_Url + Apis.getAllPatients, token);
};

export {getPatients}