import { useSelector,useDispatch } from "react-redux";
import { getHospitals } from "../API-calls/hospitalApi";
import { useEffect } from "react";
import HospitalCard from "./hospitalCard";

export default function HospitalList() {
      
  let HospitalList = useSelector(state => state.HospitalList);

  let dispatch = useDispatch();

  useEffect(() => {
    fetchAllHospitals();
  },[])
  console.log(HospitalList)
  
  let fetchAllHospitals = async () => {
    
   await getHospitals().
      then((response) => {
        
        dispatch({
          type: "setList",
          payload:response.data
        })
      })
      .catch(err => {
      console.log(err)
    })

  }
    
  return(
    <div className="d-flex justify-content-center">
      <div style={{flex:"0.3"}}>
      </div> 
      <div style={{backgroundColor:"lightgrey"}} className=" shadow-lg ">
        {HospitalList.map((hospital) => {
          return <div   key={hospital._id}>
             <HospitalCard/>
            </div>
        })}

      </div>
      <div style={{ flex:"0.2"}}></div>
  </div>
  )
}


