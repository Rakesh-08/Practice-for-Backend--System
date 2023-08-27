import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

export default function AuthError() {
  let errorCode = localStorage.getItem("errorCode")
  let errMsg= localStorage.getItem("errMsg")
  let NavigateTo = useNavigate();

    useEffect(() => { 
        if (!localStorage.getItem("firstLoad")) {
            localStorage.setItem("firstLoad",1)
        } else {
            localStorage.removeItem("firstLoad");
            NavigateTo("/Login")
        }
       
    }, [])

    return (
      <div className="vh-100 d-flex justify-content-center" style={{backgroundColor:"whitesmoke"}}>
        <div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/system-error-8078360-6477441.png?f=webp"
                    alt="error"
                    height="600em"
          />
          <p className="fs-2 rounded bg-warning lead text-danger border p-3 text-center shadow">{`${errMsg}: ${errorCode}`}</p>
        </div>
      </div>
    );
}
