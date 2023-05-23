import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";
import useAlert from "../../hooks/useAlert";

function SignInForm() {
    const setCurrentUser = useSetCurrentUser();
    useRedirect("loggedIn")
    const { setAlert } = useAlert();

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            setAlert('Login successful!', 'success');
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };
    return (      
        <Container fluid className={`my-auto p-2 ${appStyles.BackgroundImage}`}>
            <Container className={`${appStyles.Content} ${styles.SignInCol} p-3`}>
                <h1 className={styles.Header}>sign in</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label className="d-none">Username</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Group controlId="password">
                        <Form.Label className="d-none">Password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Submit}`}
                        type="submit"
                    >
                        Sign In
                    </Button>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-2">
                            {message}
                        </Alert>
                    ))}
                </Form>
            </Container>

            <Container className={`${appStyles.Content} ${styles.SignInCol} mt-3`}>
                <Link className={styles.Link} to="/signup">
                    Don't have an account? <span>Sign up now!</span>
                </Link>
            </Container>
        </Container>      
    );
}

export default SignInForm;