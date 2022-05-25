import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Row className="d-flex justify-content-center">
      <Col
        md={6}
        style={{ fontSize: "3rem" }}
      >
        <Spinner
          animation="grow"
          variant="primary"
          style={{
            width: "4rem",
            height: "4rem",
            padding: "50px auto",
            margin: "20px auto",
          }}
        />
      </Col>
    </Row>
  );
};

Loading.defaultProps = {

}
export default Loading;
