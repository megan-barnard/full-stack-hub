import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage";
import ProfileFeed from "./ProfileFeed";
import ProfileHeader from "./ProfileHeader";
import ProfileActionBar from "./ProfileActionBar";
import CircularProgress from "../CircularProgress";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { PostFeedContext } from "../../context/PostFeedContext";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser, getUserDetails, followUser } = useContext(CurrentUserContext);
  const { userDetails, userDetailsLoading, postFeed, postFeedLoading, getProfileFeed } = useContext(PostFeedContext);

  useEffect(() => {
    console.log('profile changed', userDetails);
    if (userId && !userDetailsLoading) {
      getProfileFeed(userId);
    }
  },[userId]);

  return (
    (userDetailsLoading || postFeedLoading) ? (<CircularProgress />) : (
      userDetails && userDetails.profile ? (  
        <Wrapper>
          <ProfileHeader />
          <ProfileActionBar />
          <ProfileFeed />
        </Wrapper> 
      ) : (
        <ErrorMessage message={'User not found'} />
      )
    ) 
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Profile;