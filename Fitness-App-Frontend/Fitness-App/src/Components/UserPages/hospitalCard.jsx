import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function HospitalCard({ hospital,openModal }) {
  
    return (
      <div className=" p-2 hospitalCard">
        <Card>
          <Card.Img
            variant="top"
            src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
            style={{ width: "100%", height: "22vh" }}
          />
          <Card.Body >
            <Card.Title>{hospital.hospitalName}</Card.Title>
            <Card.Text className="text-secondary">
              {` ${hospital.hospitalAddress} 
                , description of what all kinds of disease being cured here `}
            </Card.Text>
            <div>
              {" "}
              <Button
                onClick={() => openModal(hospital.hospitalName)}
                style={{ padding: "5px",fontSize:"81%" }}
                variant="primary"
              >
                Book Appointment
              </Button>
              <Button
                style={{ padding: "5px",fontSize:"81%" }}
                className="m-1"
                variant="success"
              >
                <a
                  className="text-decoration-none text-light"
                  href="https://portfolio-rakesh-08.vercel.app/"
                  target="_blank"
                >
                  Know More ...
                </a>{" "}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
}

export default HospitalCard;
