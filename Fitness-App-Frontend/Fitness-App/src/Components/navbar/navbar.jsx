import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navitem from "./navitem";


export default function Navbar() {
    const navigateTo = useNavigate();
    const [login, setLogin] = useState(true);
  

    let loginRoute = () => {
        if (login === true) {
            setShowSignup(false);
            navigateTo("/auth/login");
            return;
        }
        setLogin(true);
    };

    let signupRoute = () => {
        setLogin(false);

        if (login == false) {
            setShowSignup(true);
            navigateTo("/auth/login");
        }
    };

    return (
      <div
        className="d-flex   justify-content-between p-3"
        style={{
          backgroundColor: "white",
          height: "10vh",
          border: "1px solid grey"
        }}
      >
        <div style={{ flex: "0.4" }} className="mx-5 px-5 ">
          <h4 style={{ letterSpacing: "0.4em" }}>
            FIT <span className="bg-info px-1">INDIA</span>
          </h4>
        </div>
        <div
          style={{ flex: "0.6" }}
          className=" d-flex justify-content-around "
        >
          
          <Navitem className="fas fa-home fs-4" title="Home" route="/User" />
      
            <Navitem className="fas fa-hospital fs-4" title="H++" route="/HospitalsList" />
          
            <Navitem className="fas fa-book fs-4" title="Docs" route=""/>
          
            <Navitem className="fas fa-user fs-4" title="User" route="/UserProfile" />
          

          <div className="mb-4   ">
            <button
              onClick={signupRoute}
              className={` ${login ? "" : "active"}  rounded-1 border-0 p-1`}
            >
              sign Up
            </button>
            <button
              onClick={loginRoute}
              className={` ${login ? "active" : ""}  rounded-1 p-1 border-0`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
}
