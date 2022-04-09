import styled from "styled-components";
import { users, posts } from "../../../assets/testData";

import Like from "./Like";
import PostComment from "./PostComment";
import Share from "./Share";

const ActionBar = ({postId}) => {
  const post = posts[postId];
  return (
    <Wrapper>
      <Like />
      <PostComment />
      <Share />
    
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > * {
    background-color: red;
    padding: 8px 15px;
  }
`;

export default ActionBar;