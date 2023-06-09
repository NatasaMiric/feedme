import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Recipe from "./Recipe";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";
import styles from "../../styles/RecipesPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import MostLikedRecipes from "./MostLikedRecipes";
import MostFollowedProfiles from "../profiles/MostFollowedProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useAlert from "../../hooks/useAlert";


function RecipesPage({ message, filter = "" }) {
    const [recipes, setRecipes] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const { setAlert } = useAlert();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axiosReq.get(`/recipes/?${filter}search=${query}`);
                setRecipes(data);
                setHasLoaded(true);
                console.log(filter);
            } catch (err) {                
                setAlert("Something went wrong, please try again!", "danger");
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchRecipes();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, pathname, query, currentUser, setAlert]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <MostLikedRecipes mobile />
                <MostFollowedProfiles mobile />
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search posts"
                    />
                </Form>
                {hasLoaded ? (
                    <>
                        {recipes.results.length ? (
                            <InfiniteScroll
                                children={recipes.results.map((recipe) => (
                                    <Recipe key={recipe.id} {...recipe} setRecipes={setRecipes} />
                                ))
                                }
                                dataLength={recipes.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!recipes.next}
                                next={() => fetchMoreData(recipes, setRecipes)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <div className="mb-3">< MostLikedRecipes /></div>
                <div>< MostFollowedProfiles /></div>
            </Col>
        </Row>
    );
};

export default RecipesPage;