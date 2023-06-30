import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function HospitalCard() {
    return (

        <div className="m-3 p-2 hospitalCard">
      <Card style={{ width: "100%", height: "46vh" }}>
        <Card.Img
          variant="top"
          src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
          style={{ width: "100%", height: "12em" }}
        />
        <Card.Body className="bg">
          <Card.Title>Hospital Name</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="d-flex justify-content-between">
            {" "}
            <Button variant="primary">Book Appointment</Button>
            <Button variant="success"> Know More ...</Button>
          </div>
        </Card.Body>
      </Card></div>
    );
}

export default HospitalCard;
