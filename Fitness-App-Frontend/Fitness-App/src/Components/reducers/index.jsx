import { HospitalListReducer } from "./AllHospitalsReducers";
import { UserInfoReducer } from "./AllUserReducer";
import { combineReducers } from "redux";


let rootReducer = combineReducers({
    HospitalList: HospitalListReducer,
    ProfileInfo:  UserInfoReducer
})

export default rootReducer;










