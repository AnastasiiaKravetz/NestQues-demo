import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen() {
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();

	const dispatch = useDispatch();

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const userLogin = useSelector((state) => state.userLogin);
	const { error, loading, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer className="login-form">
			<h1>Sign In</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>E-mail</Form.Label>
					<Form.Control
						type="email"
						placeholder=""
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label className='my-2'>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder=""
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button className='btn btn-light my-3' type="submit" variant="primary">
					Submit
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
                    Not registered yet?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Create an account
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default LoginScreen;