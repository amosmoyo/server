import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container >
        <Row className='justify-content-md-center' >
            <Col sm={12} md={6} xl={4} style={{textAlign:"center"}} className="bg-dark text-white border py-2">
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer