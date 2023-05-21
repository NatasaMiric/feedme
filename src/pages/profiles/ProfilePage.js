import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import MostFollowedProfiles from "./MostFollowedProfiles";
import MostLikedRecipes from "../recipes/MostLikedRecipes";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Recipe from "../recipes/Recipe";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const {setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    const [profilePosts, setProfilePosts] = useState({ results: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/recipes/?owner__profile=${id}`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const userProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.recipes_count}</div>
                            <div>recipes</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                                onClick={() => handleUnfollow(profile) }
                            >
                                unfollow
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Submit}`}
                                onClick={() => handleFollow(profile)}
                            >
                                follow
                            </Button>
                        ))}
                </Col>
                {profile?.info && <Col className="p-3">{profile.info}</Col>}
            </Row>
        </>
    );

    const userProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s recipes</p>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((recipe) => (
                        <Recipe key={recipe.id} {...recipe} setRecipes={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <MostLikedRecipes mobile />
                <MostFollowedProfiles mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {userProfile}
                            {userProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <div className="mb-3"><MostLikedRecipes /></div>
                <div><MostFollowedProfiles /></div>
            </Col>
        </Row>
    );
}

export default ProfilePage;