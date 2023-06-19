export default function AuthError() {
    let errorCode= localStorage.getItem("errorCode")
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