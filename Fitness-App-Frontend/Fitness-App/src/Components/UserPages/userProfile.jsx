import { useState } from "react";
import { useSelector } from "react-redux";
import PhoneIcon from "@mui/icons-material/Phone";
import MaterialTable from "@material-table/core";

export default function UserProfile() {
   let [appointments,setAppointments]=useState([])
  let user = useSelector(state => state.ProfileInfo);


  let columns = [
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
  ];
  return (
    <div className=" d-flex vh-100">
      <div style={{ flex: "0.3" }} className="bg-light border shadow sticky top-25%">
        
          <div className="mx-4">
            <div className=" m-4 position-relative">
            <img className="mb-2 p-2" style={{height:'10em', borderRadius:'50%'}}
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
              alt="profile"
              /> <p className="bg-warning rounded-2 p-1" style={{position:"absolute",bottom:"0"}} > {user.userId}</p>
            </div>
            <hr/>
           
          </div>
          <div className="m-2  text-center">
            
              <h3 className="p-3 bg-success text-light">{user.firstName} {" "}{user.lastName}</h3>
            <h5 className="text-primary  ">{user.email}</h5>
            <p><PhoneIcon/> {user.phone}</p>

          </div>
        
      </div>
      <div style={{ flex: "0.7" }}>
        <div>
          <MaterialTable
            title="All of your appointments"
            columns={columns}
            data={appointments}>

          </MaterialTable>

        </div>
      </div>
    </div>
  );
}
