
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AuthApiCall from "../API-calls/authApi";
import Apis from "../API-calls/apiUtils";
import { useDispatch } from "react-redux";

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
    let [passVisibility, setPassVisibility] = useState(initial)
    let [signupInfo, setSignupInfo] = useState(defaultSignup);
    let [authMsg,setAuthMsg]= useState({msg:"",color:""})
    let { hospitalSignUp, setHospitalSignUp } = signUpToggle;
    let [spinner,setSpinner]=useState(false)

  let NavigateTo = useNavigate();
  
  useEffect(() => {
           localStorage.getItem("accessToken") && NavigateTo("/Home")
   },[])
 
  
  let toggleVisibility = () => {
   
       let obj=  passVisibility.type === 'password' ? { type: "text", class: "fa-eye" }:initial
                
        setPassVisibility(obj)
  }

  let signupFn = (e) => {
    e.preventDefault();
    setSpinner(true)
    let object;
    let path;

    if (signupInfo.lastName.includes("Hospital"||"hospital")) {
        object = {
          hospitalName: signupInfo.firstName,
          hospitalEmail: signupInfo.email,
          hospitalAddress: signupInfo.lastName,
          userId: signupInfo.userId,
          password: signupInfo.password,
          hospitalphone: signupInfo.phone,
      };
      path = Apis.hospitalSignup
    } else {
         object = {
           firstName: signupInfo.firstName,
           lastName: signupInfo.lastName,
           email:signupInfo.email,
           userId:signupInfo.userId,
           password:signupInfo.password,
           phone:signupInfo.phone,
      };
      path=Apis.userSignup
    }

    AuthApiCall(path, object)
      .then((res) => {
        
         setSpinner(false)
         setAuthMsg({ msg: "Sign up successfully !",color:"text-success" });
       
      })
      .catch((err) => {
        console.log(err)
        setAuthMsg({
          msg: "sign up Failed! some error occurred",
          color: "text-danger",
        });
      })
     
  }

  let loginFn = (e) => {
    e.preventDefault()
    setSpinner(true);

    let credential = {
      userId: signupInfo.userId,
      password: signupInfo.password
      
    }

    AuthApiCall(Apis.Signin, credential)
      .then((response) => {
        let data = response.data;
         if (data.accessToken) {
           localStorage.setItem("accessToken", data.accessToken);
           localStorage.setItem("user",JSON.stringify(data))
           if (data.firstName) {
             localStorage.setItem("firstName", data.firstName)
              localStorage.removeItem("hospitalName", "");
           
           } else {
             localStorage.setItem("hospitalName", data.hospitalName)
             localStorage.removeItem("firstName", "");
             
           }
           setSpinner(false)
           NavigateTo("/Home")
          
         }
      })
      .catch((err) => {
        console.log(err.response.data)

        if (err.request.status) {
          localStorage.setItem("errorCode", err.request.status)
          localStorage.setItem("errMsg",err.response.data.message)
        } else {
          localStorage.setItem("errorCode" ,500)
        }
        NavigateTo("/Error") 
      })
    
    
  }
    
    
    return (
      <div className="bg-dark min-vh-100 d-flex flex-wrap justify-content-around align-items-center">
        <div className="w-50  p-2" >
          <h1 className=" m-2 p-2 text-white display-6 text-uppercase lead "> welcome to <span className="text-info">fit-india</span></h1>
          <div className="text-center" >
            <img  className="w-25 rounded-pill"  src="https://static.vecteezy.com/system/resources/previews/007/469/098/original/running-man-in-modern-style-illustration-healthy-person-simple-flat-shadow-isolated-on-white-background-vector.jpg" alt="coverpic"/>
          </div>
        </div>
        <div className="authBox">
          <h4 style={{ fontStyle: "italic" }} className="text-center my-2 ">
            {" "}
            {showSignup ? labels.signupTitle : "Login"}
          </h4>
          <div className="p-3">
            <form onSubmit={showSignup ? signupFn : loginFn}>
              {showSignup && (
                <>
                  <div className="m-1 form-floating">
                    <input
                      style={{ height: "3.4em" }}
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
                    <label>{labels.firstName}</label>
                  </div>
                  <div className="m-1 form-floating">
                    <input
                      style={{ height: "3.4em" }}
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
                    <label>{labels.lastName}</label>
                  </div>
                </>
              )}

              <div className=" form-floating m-1">
                <input
                  style={{ height: "3.4em" }}
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
                <label>userId</label>
              </div>

              <div className="form-floating m-1  ">
                <input
                  style={{ height: "3.4em" }}
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
                <label>password</label>
                <span
                  onClick={toggleVisibility}
                  className={`fa position-absolute top-0  end-0 m-3 ${passVisibility.class} `}
                ></span>
              </div>

              {showSignup && (
                <>
                  <div className="m-1 form-floating">
                    <input
                      style={{ height: "3.4em" }}
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
                    <label>Email</label>
                  </div>

                  <div className="m-1 form-floating">
                    <input
                      style={{ height: "3.4em" }}
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
                    <label>Phone No.</label>
                  </div>
                </>
              )}

              <div className="my-4">
                <button className=" border rounded-2 p-2 bg-info">
                  {showSignup ? "Submit" : "Login"}
                </button>
              </div>

              {spinner && (
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </form>
            <div>
              {showSignup && (
                <button
                  onClick={() => {
                    setHospitalSignUp(!hospitalSignUp);
                    setSignupInfo(defaultSignup);
                  }}
                  className="border-0  mb-2 fst-italic fs-5 link"
                >
                  {" "}
                  {labels.userStatus}
                </button>
              )}

              <p className="text-primary">
                {showSignup
                  ? " Already have an account ?"
                  : "Don't have an account ?"}{" "}
                <button
                  onClick={() => {
                    setShowSignup(!showSignup);
                    setSignupInfo(defaultSignup);
                  }}
                  className="border-0 bg-transparent link"
                >
                  {showSignup ? "login" : "Sign up"}
                </button>
              </p>
              <p className={`${authMsg.color} m-2`}>{authMsg.msg}</p>
            </div>
          </div>
        </div>
       
      </div>
    );
}

