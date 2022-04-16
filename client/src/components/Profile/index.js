import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage";
import PostFeed from "../Feed/PostFeed";
import ProfileHeader from "./ProfileHeader";
import ProfileActionBar from "./ProfileActionBar";
import CircularProgress from "../CircularProgress";

import { users, posts } from "../../assets/testData"; // Remove

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(users[userId]);
  const [userPosts, setUserPosts] = useState([]);
  
  useEffect(() => {
    if (users[userId]) {
      console.log('userId changed', users[userId]);
      setUser(users[userId]);
      testPostArr();
    }
    
  },[userId]);

  if (!user) return <ErrorMessage message={'User not found'} />;

  const testPostArr = () => {// Temporary object => array converter
    let userPosts = users[userId].postIds;   
    let postsArr = Object.entries(posts).map((post) =>  post[1]);
    
    postsArr = postsArr.filter((post) =>  {
      let match = false;
      for (let i = 0; i < userPosts.length ; i++) {
        if (userPosts[i] === post.id) match = true;        
      }
      return match ? true : false;
    });
    setUserPosts(postsArr);
  };


  return (
    !user.id ? <CircularProgress /> : (
      <Wrapper>
        <ProfileHeader user={user} />
        <ProfileActionBar posts={userPosts} />
        <PostFeed posts={userPosts} />
      </Wrapper>
    )
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Profile;