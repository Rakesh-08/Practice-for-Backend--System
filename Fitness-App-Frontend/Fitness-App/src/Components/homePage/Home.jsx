import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../navbar/navbar";
import HealthCrousal from "../Crousal/healthCrousal";
import Footer from "../footer/footer";

export default function HomePage() {
  let NavigateTo = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      NavigateTo("/");
    }
  });

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
        <div className="d-flex justify-content-around bg-light p-4 my-5">
          <InfoCard info="Global Health Index" count="66/195" />
          <InfoCard info="Life Expectency in india" count="70.8 years" />
          <InfoCard info="Health Expenditure" count="3% of GDP (2019)" />
        </div>
        <div className=" d-flex h-50  align-items-center justify-content-center p-2 m-3 ">
          <div className="p-3  h-100 w-50 rounded-3 shadow-lg ">
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
        className="vh-100 d-flex justify-content-center my-5 p-5 bg-info"
        style={{ borderRadius: "1000% 8% 4% 4%" }}
      >
        <img
          className="w-50 h-100"
          style={{ borderRadius: "50%" }}
          src="https://www.heartfoundation.org.au/getmedia/238e1924-9785-4e17-b816-6ff8e7af1c55/MicrosoftTeams-image-(4).png"
          alt="info"
        />
      </div>

      <div className="vh-100">
        <div className="d-flex p-5 justify-content-around">
          <div className="m-3">
            <img
              style={{ height: "23vw", borderRadius: "20%" }}
              src="https://thumbs.gfycat.com/UnnaturalAgitatedAntelope-max-1mb.gif"
              alt="quote"
            />
          </div>
          <div className=" w-50 h-50 d-flex align-items-center ms-5 askMeBox">
            <div className="w-75  p-5 rounded-3 shadow-lg text-center  ">
              <h4 className="my-3">Have any questions ?</h4>
              <p>
                {" "}
                we don't want to you have any trouble, so resolve you query here
                only
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
      style={{
        width: "20vw",
        height: "25vh",
        backgroundColor: "grey",
        borderRadius: "10%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h6 style={{ fontStyle: "italic", color: "yellow", fontSize: "1.6em" }}>
          {count}
        </h6>
        <p className="text-light  p-2">{info}</p>
      </div>
    </div>
  );
}
