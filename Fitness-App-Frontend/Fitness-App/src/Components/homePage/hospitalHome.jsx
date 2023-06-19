import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HospitalHome() {
  let NavigateTo = useNavigate();
  let userType = localStorage.getItem("hospitalName");

  useEffect(() => {
    if (!(localStorage.getItem("accessToken") && userType)) {
      NavigateTo("/");
    }
  });

    return (
      <div>
        <h2>{`Welcome ${userType} in this fitness-app`}</h2>
      </div>
    );
}
