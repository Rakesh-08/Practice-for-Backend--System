import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../navbar/navbar";
import HealthCrousal from "../Crousal/healthCrousal";
import Footer from "../footer/footer";

export default function HomePage() {
  let NavigateTo = useNavigate();

  

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <div className="vh-100">
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
        <div className="d-flex justify-content-around bg-light p-3 my-5">
          <InfoCard info="Global Health Index" count="66/195" />
          <InfoCard info="Life Expectency in india" count="70.8 years" />
          <InfoCard info="Health Expenditure" count="3% of GDP (2019)" />
        </div>
        <div className=" d-flex  align-items-center justify-content-center p-2 m-3 ">
          <div className="p-3  rounded-3 shadow-lg ">
            <h4 className="p-4 text-center text-secondary">
              Daily Routine To Stay healthy{" "}
            </h4>
            <div>
              <div className="taskList">
                <span> # Morning walk and Exercise</span>
                <input className="" type="checkbox" />
              </div>
              <div className="taskList">
                <span> # 10,000 steps a day </span>
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

      <div
        className="vh-100 d-flex justify-content-center my-5 p-3 bg-success"
        style={{ borderRadius: "1000% 8% 4% 4%" }}
      >
        <img
          style={{ borderRadius: "50%", width: "65%", height: "75%" }}
          src="https://www.heartfoundation.org.au/getmedia/238e1924-9785-4e17-b816-6ff8e7af1c55/MicrosoftTeams-image-(4).png"
          alt="info"
        />
      </div>

      <div className="vh-100">
        <div className="d-flex p-4 my-5 justify-content-around">
          <div className="m-3">
            <img
              style={{ height: "23vw", borderRadius: "20%",backgroundColor:"purple" }}
              src="https://cdn.quotesgram.com/img/15/97/2017650680-tumblr_mz791eLFqe1r2zyogo1_500.gif"
              alt="quote"
            />
          </div>
          <div className=" w-50 d-flex align-items-center  askMeBox">
            <div className="w-100  p-3 rounded-3 shadow-lg text-center  ">
              <h4 className="my-3">Have any questions ?</h4>
              <p>
                {" "}
                 clear you query here
                only and ask to our experts about your problems
              </p>
              <p
                className="text-primary"
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  lineHeight: "2",
                }}
              >
                {" "}
                learn more {">"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ info, count }) {
  return (
    <div
      style={{minHeight:"20vh"}}
      className="bg-secondary m-2 rounded p-1"
    >
      <div className="text-center h-100">
        <h6 className="fst-italic fs-4 my-3">
          {count}
        </h6>
        <p className="text-light  p-2">{info}</p>
      </div>
    </div>
  );
}
