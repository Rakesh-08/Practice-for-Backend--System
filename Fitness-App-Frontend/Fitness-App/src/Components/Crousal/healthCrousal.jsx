import Carousel from "react-bootstrap/Carousel";

function HealthCrousal() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{ height: "65vh", width: "100%" }}
          className="d-block "
          src="https://api.time.com/wp-content/uploads/2018/10/gettyimages-862577934.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "65vh", width: "100%" }}
          className="d-block"
          src="https://blogs.dpuerp.in/Images/Blog/64/167-key-to-healthy-lifestyle-of-professionals.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "65vh", width: "100%" }}
          className="d-block "
          src="https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.webp?b=1&s=170667a&w=0&k=20&c=KdkqtpvIHgiMk4ZEqlXDt53NjYYszTccGrnHJKkecF0="
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HealthCrousal;
