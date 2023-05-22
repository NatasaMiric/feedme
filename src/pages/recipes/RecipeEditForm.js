import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import useAlert from "../../hooks/useAlert";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function RecipeEditForm() {

    const [errors, setErrors] = useState({});


    const [recipeData, setRecipeData] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        category: "appetizer",
        difficulty: "easy",
        cooking_time: "",
        recipe_image: "",
    });

    const { title, ingredients, instructions, category, difficulty,
        cooking_time, recipe_image } = recipeData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();
    const { setAlert } = useAlert();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/recipes/${id}/`);
                const { title, ingredients, instructions, category, difficulty,
                    cooking_time, recipe_image, is_owner } = data;

                is_owner ? setRecipeData({
                    title, ingredients, instructions, category, difficulty,
                    cooking_time, recipe_image
                }) : history.push("/");
            } catch (err) {
                //console.log(err);
                setAlert("Something went wrong, please try again!", "danger");
            }
        };

        handleMount();
    }, [history, id, setAlert]);

    const handleChange = (event) => {
        setRecipeData({
            ...recipeData,
            [event.target.name]: event.target.value,
        });
    };

    const handleRecipeImageChange = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(recipe_image);
            setRecipeData({
                ...recipeData,
                recipe_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("ingredients", ingredients);
        formData.append("instructions", instructions);
        formData.append("category", category);
        formData.append("difficulty", difficulty);
        formData.append("cooking_time", cooking_time);

        if (imageInput?.current?.files[0]) {
            formData.append("recipe_image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/recipes/${id}/`, formData);
            history.push(`/recipes/${id}/`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const formFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="ingredients"
                    value={ingredients}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.ingredients?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="instructions"
                    value={instructions}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.instructions?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    as="select"
                    name="category"
                    value={category}
                    onChange={handleChange}>
                    <option value="appetizer">Appetizer</option>
                    <option value="main course">Main course</option>
                    <option value="dessert">Dessert</option>
                    <option value="side dish">Side Dish</option>
                    <option value="beverage">Beverage</option>
                    <option value="bread">Bread</option>
                    <option value="snack">Snack</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="condiments">Condiments</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </Form.Control>
            </Form.Group>
            {errors?.category?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Difficulty</Form.Label>
                <Form.Control
                    as="select"
                    name="difficulty"
                    onChange={handleChange}
                    value={difficulty}>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                </Form.Control>
            </Form.Group>
            {errors?.difficulty?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Cooking time</Form.Label>
                <Form.Control
                    type="text"
                    name="cooking_time"
                    value={cooking_time}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.cooking_time?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button
                className={`${btnStyles.Button} ${btnStyles.Submit}`}
                onClick={() => { history.goBack() }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Submit}`} type="submit">
                save
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">

                            <figure>
                                <Image className={appStyles.Image} src={recipe_image} rounded />
                            </figure>
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Submit} btn`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>

                            <Form.File
                                id="image-upload"
                                accept="recipe_image/*"
                                onChange={handleRecipeImageChange}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.recipe_image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{formFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{formFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default RecipeEditForm;