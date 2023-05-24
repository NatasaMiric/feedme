import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import MostLikedRecipes from "./MostLikedRecipes";
import MostFollowedProfiles from "../profiles/MostFollowedProfiles";
import useAlert from "../../hooks/useAlert";

function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });
    const { setAlert } = useAlert();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/comments/?recipe=${id}`)
                ]);
                setRecipe({ results: [recipe] });
                setComments(comments);
            } catch (err) {                
                setAlert("Something went wrong, please try again!", "danger");
            }
        };

        handleMount();
    }, [id, setAlert]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                < MostLikedRecipes mobile />
                < MostFollowedProfiles mobile />
                < Recipe {...recipe.results[0]} setRecipes={setRecipe} recipeDetailPage />
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            recipe={id}
                            setRecipe={setRecipe}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll
                            children={comments.results.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    {...comment}
                                    setRecipe={setRecipe}
                                    setComments={setComments} />
                            ))}
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>No comments yet, be the first to comment!</span>
                    ) : (
                        <span>No comments... yet</span>
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <div className="mb-3"><MostLikedRecipes /></div>
                <div>< MostFollowedProfiles /></div>
            </Col>
        </Row>
    );
}

export default RecipeDetailPage;