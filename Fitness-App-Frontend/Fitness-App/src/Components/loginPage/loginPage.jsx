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
      userStatus: "Wants to join as Hospital ? ",
         signupTitle:"User Sign Up"
        
    }
    let hospitalLabels = {
      firstName: "Hospital Name",
      lastName: "Address",
      email: "Email",
      phone: "Phone",
      userId: "userId",
      password: "password",
      userStatus: "Wants to join as User ?",
      signupTitle: "Hospital Sign Up",
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