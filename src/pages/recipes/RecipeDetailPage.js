import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";

function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                ]);
                setRecipe({ results: [recipe] });
                console.log(recipe);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Most liked recipes for mobile</p>
                < Recipe {...recipe.results[0]} setRecipes={setRecipe} recipeDetailPage/>
                <Container className={appStyles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Most liked recipes for desktop
            </Col>
        </Row>
    );
}

export default RecipeDetailPage;