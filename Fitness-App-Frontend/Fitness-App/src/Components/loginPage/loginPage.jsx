import { useState } from "react"
import LoginSignup from "./LoginSignup";
import "./loginPage.css"


export default function LoginPage() {
    let [hospitalSignUp, setHospitalSignUp] = useState(false);
    let userLabels = {
        firstName: "First Name",
        lastName:"Last Name",
        email: "Email",
        phone: "Phone",
        userId: "userId",
        password: "password",
         userStatus: "sign up as hospital",
        
    }
    let hospitalLabels = {
      firstName: "Hospital Name",
      lastName: "Address",
      email: "Email",
      phone: "Phone",
      userId: "userId",
      password: "password",
      userStatus: "sign up as user",
    };
    
    
    return (
      <div>
        {hospitalSignUp ? (
          <LoginSignup
            labels={hospitalLabels}
            signUpToggle={{ hospitalSignUp, setHospitalSignUp }}
          />
        ) : (
          <LoginSignup
            labels={userLabels}
            signUpToggle={{ hospitalSignUp, setHospitalSignUp }}
          />
        )}
      </div>
    );
}