import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom"
import './App.css'
import LoginPage from './Components/loginPage/loginPage'
import AuthError from "./Components/ErrorPages/authError";
import Profile from "./Components/UserPages/Profile";
import HomePage from "./Components/homePage/Home";
import Navbar from "./Components/navbar/navbar";
import HospitalList from "./Components/UserPages/HospitalsList";
import { useEffect,useState } from "react" ;
import { useDispatch } from "react-redux";


function App() {

  let dispatch = useDispatch();

   useEffect(() => {
     let data = localStorage.getItem("user")
     console.log(JSON.parse(data));
     dispatch({
       type: "setUser",
       payload: JSON.parse(data),
     });
   }, []);
  
  return (
    <div>
      <BrowserRouter>
        <LayoutForNonNavbar>
            <Navbar/>
        </LayoutForNonNavbar>
     
        
       
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Error" element={<AuthError />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/HospitalsList" element={<HospitalList/>}></Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App


function LayoutForNonNavbar({ children }) {

  let [showNavbar, setShowNavbar] = useState(false)
  let location = useLocation();
   let excludedRoutes=["/","/Error"]
  

  useEffect(() => {

    if (excludedRoutes.includes(location.pathname)) {
          setShowNavbar(false)
    } else {
      setShowNavbar(true)
    }
    
  },[location])
  
  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      {showNavbar && children}
    </div>
  );
}
