import styled from "styled-components";
import Post from "../Post/index";
import { users, posts } from "../../assets/testData";

const HomeFeed = () => {
  //Get posts as an array

  return (
    <Wrapper>
      HomeFeed
      {Object.keys(posts).map((postId) => {
        return <Post key={postId} postId={postId} />;
      })}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: lightgray;

  
`;

export default HomeFeed;