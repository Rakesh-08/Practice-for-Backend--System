import { useNavigate } from "react-router-dom";
import { useEffect }from "react"

export default function AuthError() {
  let errorCode = localStorage.getItem("errorCode")
  let NavigateTo = useNavigate();
  
  useEffect(() => {
          window.onload=NavigateTo("/")
 },[])

    return (
      <div className="vh-100 d-flex justify-content-center" style={{backgroundColor:"whitesmoke"}}>
        <div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/system-error-8078360-6477441.png?f=webp"
                    alt="error"
                    height="600em"
          />
          <p className="fs-4">{`Error occurred with code : ${errorCode}`}</p>
        </div>
      </div>
    );
}