import { useSelector,useDispatch } from "react-redux";
import { getHospitals } from "../API-calls/hospitalApi";
import { useEffect,useState } from "react";
import HospitalCard from "./hospitalCard";
import { Modal } from "react-bootstrap";

export default function HospitalList() {
  let [showModal, setShowModal] = useState(false);
  let [hospitalId,setHospitalId]=useState("")
      
  let HospitalList = useSelector(state => state.HospitalList);

  let dispatch = useDispatch();

  useEffect(() => {
    fetchAllHospitals();
  },[])
  
  let openModal = (id)=>{
    setHospitalId(id)
    setShowModal(true)
  }
  
  console.log(hospitalId)
  
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
    
  return (
    <div className="d-flex justify-content-center">
      <div style={{ flex: "0.3" }}></div>
      <div style={{ backgroundColor: "lightgrey" }} className="w-50 shadow-lg ">
        {HospitalList.map((hospital) => {
          return (
            <div key={hospital._id}>
              <HospitalCard hospital={hospital} openModal={openModal} />
            </div>
          );
        })}
      </div>
      {showModal && (
        <div>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            fullscreen={true}
            centered
            backdrop="static"
          >
            <Modal.Header  closeButton>Appointment Booking Form</Modal.Header>
            <Modal.Body>
              <form>
                <div>
                  <label>Hospital </label>
                  <input />
                </div>
                <div>
                  <label>Department </label>
                  <select value="select">
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </select>
                </div>
                <div>
                  <label> Symptoms's Category </label>
                  <select>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </select>
                </div>
                <div>
                  <label>Duration/Timings </label>
                  <input />
                </div>
                <div>
                  <label> short descripion on how you feels </label>
                  <input />
                </div>
                <div>
                  <label>Appointment Date</label>
                  <input type="datetime-local" />
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      )}
      <div style={{ flex: "0.3" }}></div>
    </div>
  );
}


