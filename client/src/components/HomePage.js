import styled from "styled-components";
import { Container } from "./Styles";

import ErrorMessage from "./ErrorMessage";
import PostFeed from "./Feed/PostFeed";

import { users, posts } from "../assets/testData";

const HomePage = () => {
  //Get posts as an array
  const error = false;
  if (error === true) return <ErrorMessage message={'homepage error'} />;

  // Temporary object => array converter
  let postsArr = Object.entries(posts); 
  postsArr = postsArr.map((post) =>  post[1]);

  return (
    <Wrapper>
      <CreatePost>Create Post</CreatePost>
      <PostFeed posts={postsArr} />
    </Wrapper>
  )
};

const Wrapper = styled.div`
  
`;

const CreatePost = styled(Container)`
  
`;

export default HomePage;