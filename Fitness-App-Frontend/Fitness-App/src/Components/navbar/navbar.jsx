import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import Navitem from "./navitem";


export default function Navbar() {
    const navigateTo = useNavigate();
    const [login, setLogin] = useState(true);
  let dispatch = useDispatch();

    let loginRoute = () => {
        if (login === true) {
            navigateTo("/");
            return;
        }
        setLogin(true);
    };

    let signupRoute = () => {
      
        if (login == false) {
          navigateTo("/");
          return
      }
      setLogin(false);
    };
  let logoutFn = () => {

    let confirmation=window.confirm("Are you sure ?")
  
    if (confirmation) {
      localStorage.clear();
       dispatch({
         type: "setUser",
         payload: {},
       });
      navigateTo("/")
    }


  }
    return (
      <div
        className="d-flex shadow  justify-content-between p-3"
        style={{
          backgroundColor: "white",
          height: "10vh",
          width:"100vw",
          
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
          <Navitem className="fas fa-home fs-4" title="Home" route="/Home" />

          <Navitem
            className="fas fa-hospital fs-4"
            title="H++"
            route="/HospitalsList"
          />

          <Navitem className="fas fa-book fs-4" title="Docs" route="" />

          <Navitem
            className="fas fa-user fs-4"
            title="User"
            route="/Profile"
          />

          {localStorage.getItem("accessToken") ? (
            <div  className='ps-5'>
              <button onClick={logoutFn} className="btn btn-sm btn-danger shadow ">
                Log out
                 </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    );
}
