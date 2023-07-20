import { useNavigate } from "react-router-dom";


export default function AuthError() {
  let errorCode = localStorage.getItem("errorCode")
  let errMsg= localStorage.getItem("errMsg")
  let NavigateTo = useNavigate();

  if (window.location.reload) {
   NavigateTo("/")
  }

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