import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Container } from "./Styles";

import ErrorMessage from "./ErrorMessage";
import Post from "./Post/index";
import CircularProgress from "./CircularProgress";
import { PostFeedContext } from "../context/PostFeedContext";

const HomePage = () => {
  const { postFeed, getHomeFeed, postFeedLoading } = useContext(PostFeedContext);
  useEffect(() => {
    console.log('get homefeed');
    getHomeFeed();
  }, []);

  //Get posts as an array
  const error = false;
  if (error === true) return 

  return (
    <Wrapper>
      {postFeedLoading ? (<CircularProgress />) : (
        (postFeed && postFeed.length) ? (
          postFeed.map((post) => <Post key={post.id} post={post} />)
        ) : (<ErrorMessage message={'No available Posts'} />)
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyPosts = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  margin-top: 25px;
  text-align: center;
`;

export default HomePage;