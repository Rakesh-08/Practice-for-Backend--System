import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import PhoneIcon from "@mui/icons-material/Phone";
import MaterialTable from "@material-table/core";
import { getAllAppointments, removeAppointment } from "../API-calls/appointmentApi";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAppointmentModal from "../updateAppointmentComponent";




export default function UserProfile() {
  let [appointments, setAppointments] = useState([])
  let [showTable, setShowTable] = useState(false)
  let [status, setStatus] = useState({})
   let dispatch = useDispatch();

  let { ProfileInfo:user, UpdateAppointment } = useSelector(
    (state) => state
  );
  
  useEffect(() => {
    fetchAllAppointments();
  }, [])
  
  let AppointmentStatus = (data) => {

    let temp = {
      OPEN: 0,
      VISITED: 0,
      CANCELLED: 0
    }
    for (let i = 0; i < data.length; i++){
       temp[data[i].status] += 1;
    }
   setStatus(temp)
    
  }


  let fetchAllAppointments = () => {
    
    getAllAppointments().then((response => {
      setAppointments(response.data)
      AppointmentStatus(response.data)

    })).catch(err => {
      console.log(err)
    })
  }

  let deleteAppointment = (id) => {
      
    let confirmation = window.confirm("Are you sure ?")
    if (confirmation) {
      removeAppointment(id)
        .then((res) => { fetchAllAppointments() })
        .catch(err=>console.log(err))
    }
  }

  let columns = [
    { title: "ID", field: "_id" },
    { title: "Hospital Name", field: "hospitalName" },
    { title: "Department", field: "department" },
    { title: "Date of Appointment", field: "appointmentDate" },
    { title: "Timing", field: "shift" },
    { title: "Status", field: "status" },
  ];
  return (
    <div
      className=" d-flex vh-100"
    >
      <div
        style={{ flex: "0.3" }}
        className="bg-light border shadow sticky top-25%"
      >
        <div className="mx-4">
          <div className=" m-4 position-relative">
            <img
              className="mb-2 p-2"
              style={{ height: "10em", borderRadius: "50%" }}
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
              alt="profile"
            />{" "}
            <p
              className="bg-warning rounded-2 p-1"
              style={{ position: "absolute", bottom: "0" }}
            >
              {" "}
              {user.userId}
            </p>
          </div>
          <hr />
        </div>
        <div className="m-2  text-center">
          <h3 className="p-3 bg-success text-light">
            {user.firstName} {user.lastName}
          </h3>
          <h5 className="text-primary my-3  ">{user.email}</h5>
          <p>
            <PhoneIcon /> {user.phone}
          </p>
        </div>
      </div>
      <div style={{ flex: "0.7" }}>
        <h2 className="m-3 p-2 fs-5 fst-italic text-danger">Appointments-</h2>

        <div className="d-flex m-2 p-2  justify-content-around">
          <InfoBox title="OPEN" count={status.OPEN} color="blue" />
          <InfoBox title="VISITED" count={status.VISITED} color="purple" />
          <InfoBox title="CANCELLED" count={status.CANCELLED} color="grey" />
        </div>
        <hr className="mx-auto text-warning  w-75" />
        <div className="m-2 p-4">
          {showTable ? (
            <div>
              <button
                onClick={() => setShowTable(false)}
                className=" text-light btn border bg-danger p-2 m-2 shadow"
              >
                Hide
              </button>
              <MaterialTable
                title="All of your appointments"
                columns={columns}
                data={appointments}
                actions={[
                  {
                    icon: DeleteIcon,
                    tooltip: "delete",
                    onClick: (e, rowData) => {
                      deleteAppointment(rowData._id);
                    },
                  },
                ]}
                onRowClick={(e, rowData) => {
                 dispatch({
                   type: "setShowUpdate",
                   payload: true,
                 });
                }}
                options={{
                  actionsColumnIndex: -1,
                }}
              ></MaterialTable>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowTable(true)}
                className=" btn border bg-info p-2 m-2 shadow"
              >
                Show Details
              </button>
            </div>
          )}
        </div>
        <div>
          <UpdateAppointmentModal/>
        </div>
      </div>
    </div>
  );
}


let InfoBox = ({title,count,color}) => {
  
  return (
    <div style={{ minWidth: "12vw", backgroundColor:[color] }} className="text-center  p-3 rounded-4">
      <h4 className="text-white">{title}</h4>
      <p className="fs-4">{count}</p>
    </div>
  )
}