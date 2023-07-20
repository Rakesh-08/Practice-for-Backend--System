import { Modal } from "react-bootstrap";
import { useState } from "react";

export default function Records() {
  let [recordModal, setRecordModal] = useState(true);

  return (
    <div>
      <Modal
        show={recordModal}
        onHide={() => setRecordModal(false)}
        backdrop="static"
        size="lg"
      >
        <Modal.Header className="bg-warning fs-5" closeButton>
          Create record for Patients visit
        </Modal.Header>
        <Modal.Body>
          <h3 className="lead text-primary text-center">{`Appointment Id : ${2}`}</h3>

          <form>
            <div>
              <label> Doctor attended </label>
              <input />
            </div>
            <div>
              <label> Prescription </label>
              <input />
            </div>
            <div>
              <label> Dosage </label>
              <input />
            </div>
            <div>
              <label>Remarks </label>
              <input />
            </div>
                      <div>
                          <button>create record</button>
               </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
