import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import useAlert from "../../hooks/useAlert";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const history = useHistory();
  const [errors, setErrors] = useState({});
  useRedirect("loggedIn")
  const { setAlert } = useAlert();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData) 
      setAlert('Successfully signed up!', 'success');     
      history.push('/signin')
    } catch (err) {
      setErrors(err.response?.data);
    }
  }

  return (
    <Row>
      <Col
        lg={8} sm={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FormsImage}`}
          src={
            "https://res.cloudinary.com/dyji6gqtn/image/upload/v1682862164/formimage_qibfmd.jpg"
          }
        />
      </Col>
      <Col className="my-auto py-2 p-md-2" lg={4} md={6}>
        <Container className={`${appStyles.Content} p-3 `}>
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange} />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange} />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange} />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Submit}`} type="submit">
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-2">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className="mt-3">
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;