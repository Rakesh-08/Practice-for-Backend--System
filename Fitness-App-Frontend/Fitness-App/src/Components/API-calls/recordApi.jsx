import axios from "axios";
import Apis from "./apiUtils";

let token = {
  headers: {
    "x-access-token": localStorage.getItem("accessToken"),
  },
};

let postRecords = async (obj) => {
  return await axios.post(Apis.Base_Url +Apis.postRecord,obj, token);
};

let getrecords = async () => {
   return await axios.get(Apis.Base_Url + Apis.postRecord, token);
}

export { postRecords,getrecords };
