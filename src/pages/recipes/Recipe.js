import React from 'react';
import styles from '../../styles/Recipe.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { OptionsDropdown } from '../../components/OptionsDropdown';

const Recipe = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        title,
        ingredients,
        instructions,
        category,
        recipe_image,
        difficulty,
        cooking_time,
        like_id,
        bookmark_id,
        comments_count,
        likes_count,
        updated_at,
        recipeDetailPage,
        setRecipes,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const details = recipeDetailPage ? (
        <Card.Body>
            <Card.Subtitle className={styles.Subtitle}>Ingredients:</Card.Subtitle>
            {ingredients && <Card.Text >{ingredients}</Card.Text>}
            <Card.Subtitle className={styles.Subtitle}>Instructions:</Card.Subtitle>
            {instructions && <Card.Text >{instructions}</Card.Text>}
        </Card.Body>
    ) : (
        <></>
    );

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/recipes/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/recipes/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { recipe: id });
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, likes_count: recipe.likes_count + 1, like_id: data.id }
                        : recipe;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, likes_count: recipe.likes_count - 1, like_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleBookmark = async () => {
        try {
            const { data } = await axiosRes.post("/bookmarks/", { recipe: id });
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, bookmark_id: data.id }
                        : recipe;
                })
            })
            )
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveBookmark = async () => {
        try {
            await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, bookmark_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Recipe}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>

                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && recipeDetailPage && (
                            <OptionsDropdown handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/recipes/${id}`}>
                <Card.Img src={recipe_image} alt={title} />
            </Link>
            <Card.Body >
                {title && <Card.Title className={styles.Header}>{title}</Card.Title>}
                <div className={styles.CardText}>
                    {cooking_time && <Card.Text >Cooking time: {cooking_time}</Card.Text>}
                    {difficulty && <Card.Text >Difficulty: {difficulty}</Card.Text>}
                    {category && <Card.Text >Category: {category}</Card.Text>}
                </div>
                <div className={styles.CardIcons}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own recipe!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like recipes!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/recipes/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't bookmark your own recipe!</Tooltip>}
                        >
                            <i className="far fa-bookmark" />
                        </OverlayTrigger>
                    ) : bookmark_id ? (
                        <span onClick={handleRemoveBookmark}>
                            <i className={`fas fa-bookmark ${styles.Bookmark}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleBookmark}>
                            <i className={`far fa-bookmark ${styles.BookmarkOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to bookmark recipes!</Tooltip>}
                        >
                            <i className="far fa-bookmark" />
                        </OverlayTrigger>
                    )}
                </div>
            </Card.Body>
            {details}
        </Card>
    )
}

export default Recipe
