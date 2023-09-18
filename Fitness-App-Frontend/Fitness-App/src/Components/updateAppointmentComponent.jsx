import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { editAppointment } from "./API-calls/appointmentApi";

export default function UpdateAppointmentModal({fetchAppointments,patientUser}) {

    let dispatch = useDispatch()
  let UpdateAppointment = useSelector((state) => state.UpdateAppointment);
  
  
  let handleAppointmentUpdate = (e) => {
    e.preventDefault();

    let temp = {
      appointmentDate: UpdateAppointment.appointmentDate,
      status: UpdateAppointment.status,
      shift: UpdateAppointment.appointmentTiming
    }
           
    if (UpdateAppointment.status == "VISITED" ) {
                
      let askMe = window.confirm("Have you created user record before marking it as visited ?")
      if (!askMe) {
         dispatch({
           type: "setShowUpdate",
           payload: false,
         });

        return alert("please add the user record first,then only update the status to visited")
      }
    }

    
    editAppointment(UpdateAppointment._id, temp).then((response) => {
      alert(`appointment with id ${response.data._id} has been updated`)
      fetchAppointments();
    }).catch(err => {
      console.log(err)
     alert(err.response.data.message)})
    
     dispatch({
       type: "setShowUpdate",
       payload: false,
     });
  }
    
    return (
      <div>
        <Modal
          show={UpdateAppointment.showUpdate}
          onHide={() =>
            dispatch({
              type: "setShowUpdate",
              payload: false,
            })
          }
          backdrop="static"
        >
          <Modal.Header closeButton className="fs-4 bg-primary text-white">
            Update Appointment
          </Modal.Header>
          <Modal.Body>
            <div>
              <p className="text-center  fs-5 ">{`Appointment Id : ${UpdateAppointment._id} `}</p>

              <form onSubmit={handleAppointmentUpdate}>
                <div className="m-2  input-group row ">
                  <label className=" col-md-4">Hospital Name</label>
                  <input
                    name="hospitalName"
                    value={UpdateAppointment.hospitalName}
                    readOnly={true}
                    className="  form-control"
                  />
                </div>

                <div className="m-2  input-group row ">
                  <label className="col-md-4">Date of Appointment</label>
                  <input
                    name="appointmentDate"
                    value={UpdateAppointment.appointmentDate.substring(0, 10)}
                    onChange={(e) => {
                      dispatch({
                        type: "onChange",
                        payload: {
                          key: e.target.name,
                          value: e.target.value,
                        },
                      });
                    }}
                    className="form-control  "
                    type="date"
                  />
                </div>

                <div className="m-2  row input-group">
                  <label className="col-md-4">Appointment Timing</label>
                  <select
                    name="appointmentTiming"
                    value={UpdateAppointment.appointmentTiming}
                    onChange={(e) => {
                      dispatch({
                        type: "onChange",
                        payload: {
                          key: e.target.name,
                          value: e.target.value,
                        },
                      });
                    }}
                    className="form-control "
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

                <div className="m-2  row input-group">
                  <label>Change Status</label>
                  <select
                    name="status"
                    value={UpdateAppointment.status}
                    onChange={(e) => {
                      dispatch({
                        type: "onChange",
                        payload: {
                          key: e.target.name,
                          value: e.target.value,
                        },
                      });
                    }}
                    className="form-control "
                  >
                    <option value="OPEN">OPEN</option>
                    <option disabled={patientUser} value="VISITED">
                      VISITED
                    </option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end my-2">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "setShowUpdate",
                        payload: false,
                      })
                    }
                    className="btn btn-sm btn-secondary m-2"
                  >
                    {" "}
                    cancel
                  </button>
                  <button type="submit" className="btn btn-sm btn-success m-2">
                    update
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
}