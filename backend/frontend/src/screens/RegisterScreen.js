import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen() {
	const location = useLocation();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	let navigate = useNavigate();

	const dispatch = useDispatch();

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { error, loading, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer className="register-form">
			<h1>Registration</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						required
						type="name"
						placeholder=""
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId="email">
					<Form.Label>E-mail</Form.Label>
					<Form.Control
						required
						type="email"
						placeholder=""
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type="password"
						placeholder=""
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId="passwordConfirm">
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						required
						type="password"
						placeholder=""
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button className='my-2' type="submit" variant="primary">
                    Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
                    Have an Account?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                        Sign In
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default RegisterScreen;