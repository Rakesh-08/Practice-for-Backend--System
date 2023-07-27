import { Modal } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { postRecords } from "./API-calls/recordApi";

let emptyRecordForm = {
  doctorId:"",appointmentId:"",prescription:"",dosage:"",statusReport:""
}

export default function Records({setting,doctors}) {
  let { recordModal, setRecordModal } = setting;
  let [recordInfo,setRecordInfo] = useState(emptyRecordForm)
  let UpdateAppointment = useSelector((state) => state.UpdateAppointment);
  let dispatch = useDispatch();
  

  let createRecord = (e) => {
    e.preventDefault();

    recordInfo.appointmentId = UpdateAppointment._id;
    if (!recordInfo.doctorId) {
         recordInfo.doctorId=doctors[0]._id
    }
 
    postRecords(recordInfo).then((response) => {
      setRecordModal(false)
      setRecordInfo(emptyRecordForm)
    }).catch(err=>console.log(err))
   
   

  }
  

  return (
    <div>
      <Modal
        show={recordModal}
        onHide={() => setRecordModal(false)}
        backdrop="static"
      >
        <Modal.Header className="bg-warning fs-5" closeButton>
          Create record for Patients visit
        </Modal.Header>
        <Modal.Body>
          <h3 className="lead text-center">
            Appointment Id :{" "}
            <span className="text-primary">{UpdateAppointment._id}</span>
          </h3>

          <form className="p-2">
            <div className="input-group row m-2 p-1">
              <label className="col-4"> Doctor attended </label>
              <select
                className="form-control"
                value={recordInfo.doctorId}
                onChange={(e) =>
                  setRecordInfo({ ...recordInfo, doctorId: e.target.value })
                }
              >
                {doctors?.map((doc) => (
                  <option value={doc._id} key={doc._id}>
                    {doc.firstName + " " + doc.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group row m-2 p-1">
              <label className="col-4"> Prescription </label>
              <input
                className="form-control"
                value={recordInfo.prescription}
                onChange={(e) =>
                  setRecordInfo({ ...recordInfo, prescription: e.target.value })
                }
              />
            </div>

            <div className="input-group row m-2 p-1">
              <label className="col-4"> Dosage </label>
              <input
                className="form-control"
                value={recordInfo.dosage}
                onChange={(e) =>
                  setRecordInfo({ ...recordInfo, dosage: e.target.value })
                }
              />
            </div>

            <div className="input-group row m-2 p-1">
              <label className="col-4">Remarks </label>
              <textarea
                className="form-control"
                value={recordInfo.statusReport}
                onChange={(e) =>
                  setRecordInfo({ ...recordInfo, statusReport: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary shadow m-2"
                onClick={createRecord}
              >
                create record
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
