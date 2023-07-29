import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import PhoneIcon from "@mui/icons-material/Phone";
import MaterialTable from "@material-table/core";
import {
  getAllAppointments,
  removeAppointment,
} from "../API-calls/appointmentApi";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import EmailIcon from "@mui/icons-material/Email";
import UpdateAppointmentModal from "../updateAppointmentComponent";
import { getDoctors, postDoctorRecord } from "../API-calls/doctorsApi";
import { getPatients } from "../API-calls/patients";
import Records from "../recordHistory";
import { getrecords } from "../API-calls/recordApi";


let emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "A",
  experience:""
}

export default function Profile() {
  let [appointments, setAppointments] = useState([]);
  let [showTable, setShowTable] = useState(false);
  let [status, setStatus] = useState({});
  let [nav, setNav] = useState("patients");
  let [addDoctor, setAddDoctor] = useState(emptyForm);
  let [patients, setPatients] = useState([]);
  let [doctors, setDoctors] = useState([])
  let [records, setRecords] = useState([])
  let [recordModal, setRecordModal] = useState(false);
  let dispatch = useDispatch();

  let { ProfileInfo: user, UpdateAppointment } = useSelector((state) => state);

  useEffect(() => {
    fetchAllAppointments();
    LoggedAsHospital && fetchUsers();
      fetchRecords();
  }, []);

  
  let patientUser = localStorage.getItem("firstName");
   
     let LoggedAsHospital= localStorage.getItem("hospitalName")
  // set differnt status for the appointments
  let AppointmentStatus = (data) => {
    let temp = {
      OPEN: 0,
      VISITED: 0,
      CANCELLED: 0,
    };
    if (!data) {
      setStatus(temp)
      return
    }
    for (let i = 0; i < data.length; i++) {
      temp[data[i].status] += 1;
    }
    setStatus(temp);
  };

  // get all the appointments
  let fetchAllAppointments = () => {
    getAllAppointments()
      .then((response) => {
        if (response.data.length > 0) {
           setAppointments(response.data)
        AppointmentStatus(response.data);
        }
       
      })
      .catch((err) => {
        AppointmentStatus();
        console.log(err);
      });
  };

  // delete appointment
  let deleteAppointment = (id) => {
    let confirmation = window.confirm("Are you sure ?");
    if (confirmation) {
      removeAppointment(id)
        .then((res) => {
          fetchAllAppointments();
        })
        .catch((err) => console.log(err));
    }
  };

  // create doctor record
  let createDoctorRecord = (e) => {
    e.preventDefault();
  
    postDoctorRecord(addDoctor).then((response) => {
      setAddDoctor(emptyForm);
      fetchDoctors();
      alert("Congrats! The details of new doctor is recorded ")
   }).catch(err=>console.log(err))
    
  }

  //get all track history of patients
  let fetchRecords = () => {
    
    getrecords().then(response => {
      setRecords(response.data)
    
      }).catch(err=>console.log(err))
  }

  // fetch patients and doctors data;

  let fetchUsers = () => {
    fetchDoctors();
    fetchPatients();
  }
  let fetchPatients = () => {
    getPatients().then((response) => {
    
      if (response.data.length > 0) {
           setPatients(response.data)
      } else if (!response.data.message) {
           setPatients([response.data])
      }
    }).catch(err=>console.log(err))
    
  }

  let fetchDoctors = () => {
     getDoctors()
       .then((response) => {
         if (response.data.length > 0) {
           setDoctors(response.data)
         }
        
       })
       .catch((err) => console.log(err));
    
  }

  //toggle between hospital name and patient name

  let createRecordAction = null;
  let name = null;

  if (LoggedAsHospital) {
    name={
      title: "Patient Name",
        field: "patient",
    }
    createRecordAction = {
      icon: CreateIcon,
      tooltip: "add record",
      onClick: (e,rowdata) => {
        dispatch({
          type: "onChange",
          payload: {
            key: "_id",
            value:rowdata._id
          }
        })
        setRecordModal(true)
      }
    }
  } else {
    name = { title: "Hospital Name", field: "hospitalName" };
  }
   

  let columns = [
    { title: "ID", field: "_id" },
    name
   ,
    { title: "Department", field: "department" },
    {
      title: "Date of Appointment",
      field: "appointmentDate",
      render: (rowData) => rowData.appointmentDate.substring(0, 10),
    },
    { title: "Timing", field: "shift" },
    { title: "Status", field: "status" },
  ];

  // conditional column in users table

  let usersColumn = [
    { title: "ID", field: "_id" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ];

  let conditional = nav == "patients" ? null
      : usersColumn.push(
          { title: "DEPARTMENT", field: "department" },
          { title: "Experience (In years)", field: "experience" }
    );
  

  return (
    <div>
      <div className="d-flex mb-5 ">
        <div style={{ flex: "0.3" }} className="bg-light border shadow min-vh-100">
          <div className="mx-4">
            <div className=" m-4 position-relative">
              <label htmlFor="profilePic">
                <img
                  className="mb-2 p-2"
                  style={{
                    height: "10em",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
                  alt="profile"
                />
              </label>
              <input
                style={{ display: "none", visibility: "none" }}
                type="file"
                id="profilePic"
              ></input>
              <p
                className="bg-warning rounded-2 p-1"
                style={{ position: "absolute", bottom: "0" }}
              >
                {" "}
                {user?.userId}
              </p>
            </div>
            <hr />
          </div>
          <div className="m-2  text-center">
            <h3 className="p-3 bg-success text-light">
              {user.firstName} {user.lastName} {user.hospitalName}
            </h3>
            <h4 className="m-2 p-2 ">{user.hospitalAddress}</h4>
            <h5 className="text-primary my-3  ">
              {user.email || user.hospitalEmail}
            </h5>
            <p>
              <PhoneIcon /> {user.phone || user.hospitalPhone}
            </p>
          </div>
        </div>
        <div
          style={{
            flex: "0.7",
            width: "70%",
          }}
        >
          <h2 className="m-3 p-2 fs-5 fst-italic text-danger">Appointments-</h2>

          <div className="d-flex m-2 p-2  justify-content-around">
            <InfoBox title="OPEN" count={status.OPEN} color="blue" />
            <InfoBox title="VISITED" count={status.VISITED} color="purple" />
            <InfoBox title="CANCELLED" count={status.CANCELLED} color="grey" />
          </div>

          <div className="m-2 p-4">
            {showTable ? (
              <div>
                <button
                  onClick={() => setShowTable(false)}
                  className=" text-light btn border bg-danger p-2 m-2 shadow"
                >
                  Hide
                </button>
                <div className="p-1 bg-warning">
                  {" "}
                  <MaterialTable
                    title="All of your appointments"
                    columns={columns}
                    data={appointments}
                    actions={[
                      createRecordAction,
                      {
                        icon: DeleteIcon,
                        tooltip: "delete",
                        onClick: (e, rowData) => {
                          deleteAppointment(rowData._id);
                        },
                      },
                    ]}
                    onRowClick={(e, rowData) => {
                      if (patientUser && rowData.status == "VISITED") {
                        return alert(
                          "You are not allowed change the appointment details after visiting the hospital"
                        );
                      }
                      dispatch({
                        type: "currentRow",
                        payload: {
                          showUpdate: true,
                          hospitalName: rowData.hospitalName,
                          appointmentDate: rowData.appointmentDate,
                          appointmentTiming: rowData.shift,
                          status: rowData.status,
                          _id: rowData._id,
                        },
                      });
                    }}
                    options={{
                      actionsColumnIndex: -1,
                    }}
                  ></MaterialTable>
                </div>
              </div>
            ) : (
              <>
                <div className="m-2 mb-4">
                  <button
                    onClick={() => setShowTable(true)}
                    className=" btn border bg-info p-2 m-2 shadow"
                  >
                    Show Details
                  </button>
                </div>

                {LoggedAsHospital && (
                  <div>
                    <div className=" bg-light m-2 p-3">
                      <h2 className="text-center m-3 lead fw-bold">
                        Add new doctors record
                      </h2>
                      <form onSubmit={createDoctorRecord}>
                        <div className="d-flex m-1 row">
                          <div className="col-3">
                            <label>First Name</label>
                            <input
                              required
                              className="form-control m-1"
                              value={addDoctor.firstName}
                              onChange={(e) =>
                                setAddDoctor({
                                  ...addDoctor,
                                  firstName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-3">
                            <label>Last Name</label>
                            <input
                              required
                              className="form-control m-1 "
                              value={addDoctor.lastName}
                              onChange={(e) =>
                                setAddDoctor({
                                  ...addDoctor,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="m-1 mx-2">
                          <label>Email</label>
                          <input
                            required
                            className="form-control w-25 m-1"
                            value={addDoctor.email}
                            onChange={(e) =>
                              setAddDoctor({
                                ...addDoctor,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="m-1 mx-2 p-1">
                          <label>Mobile</label>
                          <input
                            required
                            className="form-control w-25 m-1"
                            value={addDoctor.phone}
                            onChange={(e) =>
                              setAddDoctor({
                                ...addDoctor,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="d-flex m-1   row">
                          <div className="col-3">
                            <label>Department</label>
                            <select
                              required
                              value={addDoctor.department}
                              onChange={(e) =>
                                setAddDoctor({
                                  ...addDoctor,
                                  department: e.target.value,
                                })
                              }
                              className="form-control m-1"
                            >
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="E">E</option>
                              <option value="F">F</option>
                              <option value="G">G</option>
                            </select>
                          </div>
                          <div className="col-3">
                            <label>Experience</label>
                            <input
                              required
                              placeholder="In years"
                              className="form-control m-1"
                              value={addDoctor.experience}
                              onChange={(e) =>
                                setAddDoctor({
                                  ...addDoctor,
                                  experience: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="text-end m-2">
                          <button
                            type="button"
                            onClick={() => setAddDoctor(emptyForm)}
                            className="btn btn-danger m-1"
                          >
                            clear
                          </button>
                          <button className="btn btn-secondary m-1">
                            Add Data
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            <UpdateAppointmentModal
              fetchAppointments={fetchAllAppointments}
              patientUser={patientUser}
            />
          </div>
          <div>
            <Records
              doctors={doctors}
              setting={{ recordModal, setRecordModal }}
            />
          </div>
        </div>
      </div>

      {LoggedAsHospital && (
        <div className="p-5">
          <div className=" border-bottom p-2 m-2">
            <button
              onClick={() => setNav("patients")}
              className={`${
                nav == "patients" && "border-bottom border-primary "
              } bg-transparent border-0 fs-5 mx-3 `}
            >
              Patients
            </button>
            <button
              onClick={() => setNav("doctors")}
              className={`${
                nav == "doctors" && "border-bottom border-primary "
              } bg-transparent border-0 fs-5`}
            >
              Doctors
            </button>
          </div>
          <div className="my-3">
            <MaterialTable
              title={`List of ${nav}`}
              columns={usersColumn}
              data={nav == "patients" ? patients : doctors}
              onRowClick={(e, rowData) => {}}
              actions={[
                {
                  icon: EmailIcon,
                  tooltip: "send Email",
                  onClick: (e, rowData) => {},
                },
              ]}
              options={{
                headerStyle: {
                  backgroundColor: "#055555",
                  color: "#FFF",
                },
              }}
            ></MaterialTable>
          </div>
        </div>
      )}
   
      
      {records.length>0 &&<div className="m-3 p-3">
        <h2 className="text-center lead fs-4 m-2 p-2">Medical Record</h2>
        <div className="bg-light" >
          {records.map((record) => {
          return (
            <div
              key={record._id}
              className="bg-dark text-white rounded shadow my-3 p-4"
            >
              <p className="text-info">
                Record Id-<span className=" fst-italic mx-2">{record._id}</span>{" "}
              </p>
              <div className="d-flex justify-content-end m-2 ">
                <p className="mx-3">
                  Patient :{" "}
                  <span className="recordData">
                    {record.patientName}
                  </span>
                </p>
                <p className="mx-3">
                  Hospital :{" "}
                  <span className="recordData">
                    {record.hospitalName}
                  </span>{" "}
                </p>
              </div>
              <div className="m-3 p-2">
                {record.prescriptionList.map((item, index) => {
                  return (
                    <div key={index}>
                      <h5 className="lead  m-2">Visit {index + 1}</h5>
                      <p>
                        Doctor :
                        <span className="recordData">
                          {record.doctorsName[index]}
                        </span>
                      </p>
                      <p>
                        Symptoms :
                        <span className="recordData">
                          {" "}
                          {record.symptomsList[index].symptomsInfo}
                        </span>
                      </p>
                      <div className="d-flex">
                        <p>
                          Prescription :
                          <span className="recordData">
                            {" "}
                            {item.prescription}
                          </span>
                        </p>
                        <p className="mx-4">
                          Dosage :{" "}
                          <span className="recordData"> {item.dosage}</span>
                        </p>
                      </div>
                      <h5 className="my-2">
                        Report - <span className="lead fst-italic"> {record.statusReport}</span>
                       
                      </h5>
                    </div>
                  );
                })}
              </div >
             
            </div>
          );
        })}</div>
       
      </div>}
      
    </div>
  );
}

let InfoBox = ({ title, count, color }) => {
  return (
    <div
      style={{ minWidth: "12vw", backgroundColor: [color] }}
      className="text-center  p-3 rounded-4"
    >
      <h4 className="text-white">{title}</h4>
      <p className="fs-4">{count}</p>
    </div>
  );
};
