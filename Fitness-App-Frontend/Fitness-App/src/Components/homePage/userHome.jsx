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
      <div style={{ backgroundColor: "whitesmoke" }}>
        <div className="vh-100">
          <Navbar />
          <div className="p-3 ">
            <HealthCrousal />
          </div>
          <div className="m-2 mb-5 p-2 text-center  ">
            <q className=" text-primary fw-bold fs-4 fst-italic ">
              Money can't make you healthy but a good health definitely helps to
              make Money
            </q>
          </div>

          <div
            style={{
              backgroundColor: "red",
              height: "2px",
              width: "70%",
              margin: "0 auto",
            }}
          ></div>
        </div>
        <div className="vh-100">
          <div className="d-flex justify-content-around bg-light p-4 my-5">
            <InfoCard info="Total Appointments" count=" 14" />
            <InfoCard info="Open Appointments" count=" 2" />
            <InfoCard info="No. of Hospital visits" count=" 4" />
          </div>
          <div className=" d-flex h-50  align-items-center justify-content-center p-2 m-3 ">
            <div className="p-3  bg-warning h-100 w-50 rounded-3 shadow-lg ">
              <h4 className="p-4 text-center text-secondary">
                Daily Tasks Status{" "}
              </h4>
              <div>
                <div className="taskList">
                  <span> # Morning walk and Exercise</span>
                  <input className="" type="checkbox" />
                </div>
                <div className="taskList">
                  <span> # 10,000 steps on a day </span>
                  <input className="" type="checkbox" />
                </div>
                <div className="taskList">
                  <span> # healthy diet in lunch and dinner</span>
                  <input className="" type="checkbox" />
                </div>
                <div className="taskList">
                  <span> # Evening walk and yoga</span>
                  <input className="" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="m-3">
            <img
              style={{ height: "23vw", borderRadius: "50%" }}
              src="https://thumbs.gfycat.com/UnnaturalAgitatedAntelope-max-1mb.gif"
              alt="quote"
            />
          </div>
        </div>
      </div>
    );
}


function InfoCard({ info, count }) {
  
  return (
    <div
      style={{
        width: "20vw",
        height: "25vh",
        backgroundColor: "grey",
        borderRadius: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h3 style={{fontStyle:"italic",fontSize:"100%",color:"yellow"}}>{info}</h3>
        <p className=" fs-4 p-2">{count}</p>
      </div>
    </div>
  );
}