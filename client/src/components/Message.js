import React from 'react';
import {Row, Col, Spinner} from "react-bootstrap"


const Message = ({children,  variation}) => {
  return (
    <Row className='d-flex justify-content-center'>
        <Col md={9} sm={12} xl={8}>
            <p className={`${variation}`} style={{fontWeight: "bold"}}>{children}</p>
        </Col>  
    </Row>
  )
}

export default Message
