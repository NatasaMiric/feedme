import React, { useEffect, useState } from 'react';
import appStyles from '../../App.module.css';

import Container from 'react-bootstrap/Container';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from "../../components/Asset";

const MostFollowedProfiles = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        mostFollowedProfiles: { results: [] },
        pageProfile: { results: [] },
    });
    const { mostFollowedProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                )
                setProfileData(prevState => ({
                    ...prevState,
                    mostFollowedProfiles: data,
                }))
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [currentUser]);
    return (
        <Container
            className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
                }`}
        >
            {mostFollowedProfiles.results.length ? (
                <>
                    <strong>Most followed profiles:</strong>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {mostFollowedProfiles.results.slice(0, 4).map((profile) => (
                                <p key={profile.id}>{profile.owner}</p>
                            ))}
                        </div>
                    ) : (
                        mostFollowedProfiles.results.slice(0, 5).map((profile) => (
                            <p key={profile.id}>{profile.owner}</p>
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default MostFollowedProfiles;