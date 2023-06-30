import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import LoginPage from './Components/loginPage/loginPage'
import AuthError from "./Components/ErrorPages/authError";
import HospitalProfile from "./Components/HospitalPages/hospitalProfile"
import UserProfile from "./Components/UserPages/userProfile";
import HomePage from "./Components/homePage/Home";
import Navbar from "./Components/navbar/navbar";
import HospitalList from "./Components/UserPages/HospitalsList";



function App() {
  
  return (
    <div>
      <BrowserRouter>
        <div style={{position:"sticky",top:"0",zIndex:"999"}} >
           <Navbar  />
        </div>
       
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Error" element={<AuthError />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/HospitalsList" element={<HospitalList/>}></Route>
          <Route path="/HospitalProfile" element={<HospitalProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
