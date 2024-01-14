import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Col, Container, Row, Alert, Button } from "react-bootstrap";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (message) {
      const msgTime = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => {
        clearTimeout(msgTime);
      };
    }
  }, [message]);

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setMessage("User Signed In Successfully");

          localStorage.setItem("userInfo", JSON.stringify(data));

          navigate("/loggedIn");
        } else {
          setMessage("User couldnt sign in");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h1>Sign In</h1>
      {message && <Alert variant='danger'>{message}</Alert>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Dont Have an Account? <Link to='/signup'>Sign Up</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
