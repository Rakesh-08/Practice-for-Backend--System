import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import LoginPage from './Components/loginPage/loginPage'
import AuthError from "./Components/ErrorPages/authError";
import UserHome from "./Components/homePage/userHome";
import HospitalHome from "./Components/homePage/hospitalHome";
import HospitalList from "./Components/UserPages/HospitalsList";
import Profile from "./Components/UserPages/Profile";


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Error" element={<AuthError/>}></Route>
          <Route path="/User" element={<UserHome />}></Route>
          <Route path="/UserProfile" element={<Profile />}></Route>
          <Route path="/HospitalsList" element={<HospitalList/>}></Route>
          <Route path="/Hospital" element={<HospitalHome/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
