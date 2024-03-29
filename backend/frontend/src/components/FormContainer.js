import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children }) {
	return (
		<Container className="register-form login-form">
			<Row className="justify-content-md-center">
				<Col xs={15} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	);
}

export default FormContainer;