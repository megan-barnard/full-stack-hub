import styled from "styled-components";
import { FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";

import { users, posts } from "../../assets/testData"; // Remove

const ActionBar = ({postId}) => {
  const post = posts[postId];

  const likePost = () => {
    console.log('like post');


  };
  const commentOnPost = () => {
    console.log('comment on post');

  };
  const sharePost = () => {
    console.log('share post');


  };

  return (
    <Wrapper>
      <ActionBarBtn onClick={() => likePost()}><FaThumbsUp /></ActionBarBtn>
      <ActionBarBtn onClick={() => commentOnPost()}><FaRegComment /></ActionBarBtn>
      <ActionBarBtn onClick={() => sharePost()}><FaShare /></ActionBarBtn>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const ActionBarBtn = styled.button`
  color: var(--primary-button-color);;
  font-family: var(--font-heading);
  font-size: 18px;
  text-align: center;

  & svg {
    width: 23px;
    height: 23px;
  }

  &:hover {
    background-color: lightgray;
  }
`;

export default ActionBar;