import styled from "styled-components";
import { Container } from "../Styles";

import Post from "../Post/index";

const PostFeed = ({posts}) => { // Send an array of posts
  if (!posts || !posts.length) return <Container>No available posts</Container>; // Caution, this may cause errors

  return (
    <Wrapper>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default PostFeed;