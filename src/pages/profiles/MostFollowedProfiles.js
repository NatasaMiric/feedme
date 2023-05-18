// this code is based on Code Institute Moments project

import React from "react";
import appStyles from '../../App.module.css';

import Container from 'react-bootstrap/Container';
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from './Profile';


const MostFollowedProfiles = ({ mobile }) => {    
    const { mostFollowedProfiles } = useProfileData(); 
     
    return (
        <Container
            className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-2"
                }`}
        >
            {mostFollowedProfiles.results.length ? (
                <>
                    <strong>Most followed profiles:</strong>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {mostFollowedProfiles.results.slice(0, 4).map((profile) => (
                                <Profile key={profile.id} profile={profile} mobile />
                            ))}
                        </div>
                    ) : (
                        mostFollowedProfiles.results.slice(0, 5).map((profile) => (
                            <Profile key={profile.id} profile={profile} />
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