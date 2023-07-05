import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHospitals } from "../API-calls/hospitalApi";
import { useEffect,useState } from "react";
import HospitalCard from "./hospitalCard";
import { Modal } from "react-bootstrap";
import { postAppointment } from "../API-calls/appointmentApi";




let emptyAppointment = {
  hospitalName: "",
  department: "A",
  symptomsCategory: "A",
  symptomsTiming: "",
  briefNote: "",
  appointmentDate: "",
  appointmentTiming: "9:30 A.M - 10:00 A.M",
};

export default function HospitalList() {
  let [showModal, setShowModal] = useState(false);
  let [appointmentInfo, setAppointmentInfo] = useState(emptyAppointment);
  
      
  let HospitalList = useSelector(state => state.HospitalList);
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();

  useEffect(() => {
    fetchAllHospitals();
  },[])
  
  let openModal = (name)=>{
   setAppointmentInfo({...appointmentInfo,hospitalName:name})
    setShowModal(true)
  }
   
  let fetchAllHospitals =  () => {
    
    getHospitals().
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

  
  let createAppointment = (e) => {
    e.preventDefault()
    let object = {
      hospitalName: appointmentInfo.hospitalName,
      department: appointmentInfo.department,
      symptomsType: appointmentInfo.symptomsCategory,
      symptomsInfo: appointmentInfo.briefNote,
      duration: appointmentInfo.symptomsTiming,
      appointmentDate:appointmentInfo.appointmentDate,
      shift:appointmentInfo.appointmentTiming,
    };
    
    postAppointment(object).then((response) => {
           NavigateTo("/UserProfile")
    }).catch(err=>console.log(err))
  }
    
  return (
    <div className="d-flex justify-content-center ">
      <div style={{ flex: "0.3" }}>
        <div className="ms-5" style={{ position: "sticky", top: "20%" }}>
          <img
            style={{ width: "20vw" }}
            src="https://www.wordsjustforyou.com/wp-content/uploads/2020/04/Happy-World-Health-Day-Gif_wordsjustforyou_02060420.gif"
            alt="thankyoumsg"
          />
        </div>
      </div>
      <div
        style={{ backgroundColor: "lightgrey", flex: "0.45" }}
        className="w-50 shadow-lg "
      >
        {HospitalList.map((hospital) => {
          return (
            <div key={hospital._id}>
              <HospitalCard hospital={hospital} openModal={openModal} />
            </div>
          );
        })}
        {showModal && (
          <div>
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              fullscreen={true}
              centered
              backdrop="static"
            >
              <Modal.Header className="text- fs-3" closeButton>
                Appointment Booking Form
              </Modal.Header>
              <Modal.Body className="bg-light">
                <div className="d-flex  justify-content-center">
                  <form onSubmit={createAppointment}>
                    <div className="m-2 p-2 row input-group">
                      <label className="fs-4 ">Hospital </label>
                      <input
                        required
                        type="text"
                        className="form-control mx-3 fw-bold text-secondary"
                        value={appointmentInfo.hospitalName}
                        readOnly
                      />
                    </div>
                    <div className="m-2 p-2 row input-group">
                      <label>Department </label>
                      <select
                        value={appointmentInfo.department}
                        onChange={(e) =>
                          setAppointmentInfo({
                            ...appointmentInfo,
                            department: e.target.value,
                          })
                        }
                        className="form-control mx-3"
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
                    <div className="m-2 p-2 row input-group">
                      <label>Symptoms Category </label>
                      <select
                        value={appointmentInfo.symptomsCategory}
                        onChange={(e) =>
                          setAppointmentInfo({
                            ...appointmentInfo,
                            symptomsCategory: e.target.value,
                          })
                        }
                        className="form-control mx-3"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    <div className="m-2 p-2 row input-group">
                      <label>Timing of Symptoms</label>
                      <input
                        required
                        placeholder="what time do you get these symptoms "
                        type="text"
                        className="form-control mx-3"
                        value={appointmentInfo.symptomsTiming}
                        onChange={(e) =>
                          setAppointmentInfo({
                            ...appointmentInfo,
                            symptomsTiming: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="m-2 row p-2 input-group">
                      <label>Brief description about How you feeling ?</label>
                      <textarea
                        required
                        value={appointmentInfo.briefNote}
                        onChange={(e) =>
                          setAppointmentInfo({
                            ...appointmentInfo,
                            briefNote: e.target.value,
                          })
                        }
                        className="form-control mx-3"
                      ></textarea>
                    </div>
                    <div className="m-2 p-2 row input-group">
                      <label>Appointment Date</label>
                      <input
                        required
                        type="date"
                        className="form-control mx-3"
                        value={appointmentInfo.appointmentDate}
                        onChange={(e) =>
                          setAppointmentInfo({
                            ...appointmentInfo,
                            appointmentDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="m-2 p-2 row input-group">
                      <label>Appointment Timing</label>
                      <select
                        value={appointmentInfo.appointmentTiming}
                        onChange={(e) =>
                          setAppointmentInfo({
                            ...appointmentInfo,
                            appointmentTiming: e.target.value,
                          })
                        }
                        className="form-control mx-3"
                      >
                        <option value="9:30 A.M - 10:00 A.M">
                          9:30 A.M - 10:00 A.M
                        </option>
                        <option value="10:00 A.M - 11:00 A.M">
                          10:00 A.M - 11:00 A.M
                        </option>
                        <option value="11:00 A.M - 12:00 A.M">
                          11:00 A.M - 12:00 A.M
                        </option>
                        <option value="12:00 A.M - 01:00 P.M">
                          12:00 A.M - 01:00 P.M
                        </option>
                        <option value="02:30 P.M - 03:30 P.M">
                          02:30 P.M - 03:30 P.M
                        </option>
                        <option value="03:30 P.M - 04:30 P.M">
                          03:30 P.M - 04:30 P.M
                        </option>
                        <option value="04:30 P.M - 05:30 P.M">
                          04:30 P.M - 05:30 P.M
                        </option>
                        <option value="05:30 P.M - 06:00 P.M">
                          05:30 P.M - 06:00 P.M
                        </option>
                      </select>
                    </div>

                    <div className="my-5 p-4">
                      <button type="submit" className="btn btn-success btn-lg">
                        Create Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>

      <div style={{ flex: "0.25" }}>
        <div
          className="d-flex flex-column align-items-end"
          style={{ position: "sticky", top: "80%", marginRight: "1em" }}
        >
          <div>
            <img
              style={{
                height: "2.8em",
              }}
              src="https://assets.materialup.com/uploads/3bcbd752-7661-40ab-9426-60f3df3ee4ca/whatsapp.png"
              alt="whatsapp"
            />
          </div>
          <button className="btn btn-sm w-25 btn-primary ">Chat with us</button>
        </div>
      </div>
    </div>
  );
}


