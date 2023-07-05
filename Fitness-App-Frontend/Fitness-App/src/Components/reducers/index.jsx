import { HospitalListReducer } from "./AllHospitalsReducers";
import { UserInfoReducer } from "./AllUserReducer";
import { combineReducers } from "redux";
import { AppointmentUpdateReducer } from "./appointmentReducer";

let rootReducer = combineReducers({
    HospitalList: HospitalListReducer,
    ProfileInfo: UserInfoReducer,
    UpdateAppointment:AppointmentUpdateReducer
})

export default rootReducer;










