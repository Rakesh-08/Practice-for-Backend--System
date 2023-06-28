import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../navbar/navbar";
import HealthCrousal from "../Crousal/healthCrousal";


export default function UserHome() {

    let NavigateTo = useNavigate();
    let userType = localStorage.getItem("firstName");

    useEffect(() => {

        if (!(localStorage.getItem("accessToken") && userType)) {
            NavigateTo("/")
        }    
    })
 
    return (
      <div style={{ height: "100vh", backgroundColor: "whitesmoke" }}>
        <Navbar />
        <div className="p-3 ">
          <HealthCrousal/> 
        </div>
        <div className="m-2 p-2 text-center">
          <q className=" text-primary fw-bold fs-4 fst-italic">Money can't make you healthy but a good health definitely helps to make Money</q>
        </div>
         
        <div></div>
        <div></div>
      </div>
    );
}