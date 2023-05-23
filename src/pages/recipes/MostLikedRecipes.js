import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/MostLikedRecipes.module.css";
import useAlert from "../../hooks/useAlert";


const MostLikedRecipes = ({ mobile }) => {
    const [likedRecipe, setLikedRecipe] = useState({ results: [] });
    const { id } = useParams;
    const { setAlert } = useAlert();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get("/recipes/?ordering=-likes_count");
                setLikedRecipe(data);
            } catch (err) {
                //console.log(err);
                setAlert("Something went wrong, please try again!", "danger");
            }
        };
        handleMount();
    }, [id, setAlert]);

    return (
        <Container
            className={`${styles.Content} ${mobile && "d-lg-none text-center mb-3"
                }`}
        >
            {likedRecipe.results.length ? (
                <>
                    <strong>Most liked recipes:</strong>
                    {mobile ? (
                        <div className="d-flex justify-content-around mt-3">
                            {likedRecipe.results.slice(0, 4).map((recipe) => (
                                <div key={recipe.id}>
                                    <Link to={`/recipes/${recipe.id}`} className={styles.Link}>
                                        <Avatar src={recipe.recipe_image} height={50} />
                                        <p key={recipe.id}>{recipe.title}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        likedRecipe.results.slice(0, 5).map((recipe) => (
                            <div className='mt-3' key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`} className={styles.Link}>
                                    <span>
                                        <Avatar src={recipe.recipe_image} height={55} />
                                    </span>
                                    <span key={recipe.id} className='mb-2'>{recipe.title}</span>
                                </Link>
                            </div>
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )
            }
        </Container >
    );
}

export default MostLikedRecipes