
import { useNavigate } from "react-router-dom";


export default function Navitem({ className, title, route }) {
    
    let NavigateTo = useNavigate();
    let RouteTo = ()=>{
        NavigateTo(route)
    }

    return (
      <div>
        <div className=" navIcon  p-2 my-2 rounded-4">
          {route == "" ? (
            <a className="text-dark"
              href="https://github.com/Rakesh-08/Practice-for-Backend--System/tree/Fitness-App"
              target="_blank"
            >
              <i className={className}></i>
            </a>
          ) : (
            <div onClick={RouteTo}>
              <i className={className}></i>
            </div>
          )}
        </div>
        <div className=" navTitle ">{title}</div>
      </div>
    );
}