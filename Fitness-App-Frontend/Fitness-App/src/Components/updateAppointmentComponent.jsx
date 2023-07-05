import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function UpdateAppointmentModal({setShowUpdate}) {

    let dispatch = useDispatch()
    let { UpdateAppointment } = useSelector((state) => state);
    
    return (
        <div>
            <Modal
                show={UpdateAppointment.showUpdate}
                onHide={() => dispatch({
                    type: "setShowUpdate",
                    payload: false
                })}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    Update Appointment
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{`Appointment Id: `}</p>

                        <form>
                            <div>
                                <label>Hospital Name</label>
                                <input/>
                            </div>

                            <div>
                                <label>Date of Appointment</label>
                                <input type="date"/>
                            </div>

                             <div className="m-2 p-2 row input-group">
                      <label>Appointment Timing</label>
                      <select
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
                            
                             <div className="m-2 p-2 row input-group">
                      <label>Appointment Timing</label>
                      <select
                    
                        className="form-control mx-3"
                      >
                        <option value="OPEN">
                         OPEN
                        </option>
                        <option value="VISITED">
                                  VISITED
                        </option>
                        <option value="CANCELLED">
                         CANCELLED
                        </option>
                        
                      </select>
                    </div>
                        </form>
                    </div>
                </Modal.Body>


            </Modal>

        </div>
    )
}