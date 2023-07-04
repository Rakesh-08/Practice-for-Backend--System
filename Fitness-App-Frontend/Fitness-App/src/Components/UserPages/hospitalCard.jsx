import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function HospitalCard({ hospital,openModal }) {
  
    return (

        <div className="m-3 p-2 hospitalCard">
      <Card style={{ width: "100%", height: "49vh" }}>
        <Card.Img
          variant="top"
          src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
          style={{ width: "100%", height: "12em" }}
        />
        <Card.Body className="bg">
            <Card.Title>{hospital.hospitalName}</Card.Title>
          <Card.Text>
              {` ${hospital.hospitalAddress} 
                , description of what all kinds of disease being cured here `}
          </Card.Text>
          <div >
            {" "}
            <Button onClick={()=>openModal(hospital._id)} className="mx-2" variant="primary">Book Appointment</Button>
            <Button variant="success"> Know More ...</Button>
          </div>
        </Card.Body>
      </Card></div>
    );
}

export default HospitalCard;
