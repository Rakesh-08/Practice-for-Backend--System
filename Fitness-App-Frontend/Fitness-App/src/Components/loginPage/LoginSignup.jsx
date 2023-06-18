
import { useState } from "react";
import AuthApiCall from "../API-calls/authApi";
import {userSignup,Signin,hospitalSignUp } from "../API-calls/apiUtils"

let initial = { type: "password", class: "fa-eye-slash" };
let defaultSignup = {
  firstName: "",
  lastName: "",
  email: "",
  userId: "",
  password: "",
  phone:""
}


export default function LoginSignup({ labels ,signUpToggle }) {
    let [showSignup,setShowSignup]=useState(false)
  let { hospitalSignUp, setHospitalSignUp } = signUpToggle
  let [passVisibility, setPassVisibility] = useState(initial)
  let [signupInfo, setSignupInfo] = useState(defaultSignup);
  let [authMsg,setAuthMsg]= useState({msg:"",color:""})
  

  let toggleVisibility = () => {
   
       let obj=  passVisibility.type === 'password' ? { type: "text", class: "fa-eye" }:initial
                
        setPassVisibility(obj)
  }

  let signupFn = (e) => {
    e.preventDefault();
    let object;
    let path;

    if (signupInfo.email.includes("hospital")) {
        object = {
          hospitalName: signupInfo.firstName,
          hospitalEmail: signupInfo.email,
          hospitalAddress: signupInfo.lastName,
          userId: signupInfo.userId,
          password: signupInfo.password,
          phone: signupInfo.phone,
      };
      path = hospitalSignUp;
    } else {
         object = {
           firstName: signupInfo.firstName,
           lastName: signupInfo.lastName,
           email:signupInfo.email,
           userId:signupInfo.userId,
           password:signupInfo.password,
           phone:signupInfo.phone,
      };
      path=userSignup
    }

   

    AuthApiCall(path, object)
    .then((res)=>console.log(res))
    .catch((err)=> console.log(err))
     
  }

  let loginFn = (e) => {
    e.preventDefault()

    let credential = {
      userId: signupInfo.userId,
      password:signupInfo.password
    }

    AuthApiCall(signin, credential)
      .then((data) => console.log(data))
    .catch((err)=>console.log(err))
    
    
  }
    
    
    return (
      <div className="bg-dark vh-100 d-flex justify-content-center align-items-center">
        <div className="authBox">
          <h4 className="text-center my-2">
            {" "}
            {showSignup ? "Sign Up" : "Login"}
          </h4>
          <div className="p-4">
            <form onSubmit={showSignup?signupFn:loginFn} >
              {showSignup && (
                <>
                  <div className="m-2">
                    <input
                      type="text"
                      className="form-control"
                      id={labels.firstName}
                      name={labels.firstName}
                      placeholder={labels.firstName}
                      value={signupInfo.firstName}
                      onChange={(e) =>
                        setSignupInfo({
                          ...signupInfo,
                          firstName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="form-control"
                      id={labels.lastName}
                      name={labels.lastName}
                      placeholder={labels.lastName}
                      value={signupInfo.lastName}
                      onChange={(e) =>
                        setSignupInfo({
                          ...signupInfo,
                          lastName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              <div className="m-2">
                <input
                  type="text"
                  className="form-control"
                  id={labels.userId}
                  name={labels.userId}
                  placeholder={labels.userId}
                  value={signupInfo.userId}
                  onChange={(e) =>
                    setSignupInfo({ ...signupInfo, userId: e.target.value })
                  }
                  required
                />
              </div>

              <div className="m-2 d-flex">
                <input
                  type={passVisibility.type}
                  className="form-control"
                  id={labels.password}
                  name={labels.password}
                  placeholder={labels.password}
                  value={signupInfo.password}
                  onChange={(e) =>
                    setSignupInfo({ ...signupInfo, password: e.target.value })
                  }
                  required
                />{" "}
                <span
                  onClick={toggleVisibility}
                  className={`fa ${passVisibility.class}  m-2`}
                ></span>
              </div>

              {showSignup && (
                <>
                  <div className="m-2">
                    <input
                      type="text"
                      className="form-control"
                      id={labels.email}
                      name={labels.email}
                      placeholder={labels.email}
                      value={signupInfo.email}
                      onChange={(e) =>
                        setSignupInfo({
                          ...signupInfo,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="m-2">
                    <input
                      type="text"
                      className="form-control"
                      id={labels.phone}
                      name={labels.phone}
                      placeholder={labels.phone}
                      value={signupInfo.phone}
                      onChange={(e) =>
                        setSignupInfo({
                          ...signupInfo,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              <div className="my-4">
                <button  className="border-white rounded-2 p-2 bg-primary">
                  {showSignup ? "sign up" : "Login"}
                </button>
              </div>
            </form>
            <div>
              {showSignup && (
                <button
                  onClick={() => setHospitalSignUp(!hospitalSignUp)}
                  className="border-0  mb-2 text-success link"
                >
                  {" "}
                  {labels.userStatus}
                </button>
              )}

              <p>
                {showSignup
                  ? " Already have an account ?"
                  : "Don't have an account ?"}{" "}
                <button
                  onClick={() => setShowSignup(!showSignup)}
                  className="border-0 link"
                >
                  {showSignup ? "login" : "Sign up"}
                </button>
              </p>
              <p className={`${authMsg.color} m-2`}>{authMsg.msg }</p>
            </div>
          </div>
        </div>
      </div>
    );
}

