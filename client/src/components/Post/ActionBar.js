import styled from "styled-components";
import { FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";

import { PostContext } from "../../context/PostContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const ActionBar = ({ postId, likedBy }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { likePost } = useContext(PostContext);
  const [ liked, setLiked ] = useState(likedBy.includes(currentUser.id));


  const handleLike = () => {
    const newLike = !liked;
    setLiked(newLike);
    likePost({postId, uid: currentUser.id, like: newLike});
    console.log('like post:',postId,newLike);
  };

  const handleComment = () => {
    console.log('comment on post:',postId);
  };

  const handleShare = () => {
    console.log('share post:',postId);
  };

  return (
    <Wrapper>
      {/* <Count></Count>  ADD LIKE COUNT*/}
      <ActionBarBtn onClick={() => handleLike()} className={liked ? 'liked' : ''}><FaThumbsUp size={27} /></ActionBarBtn>
      <ActionBarBtn onClick={() => handleComment()}><FaRegComment size={27} /></ActionBarBtn>
      <ActionBarBtn onClick={() => handleShare()}><FaShare size={27} /></ActionBarBtn>
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
  &:hover svg {
    opacity: 0.55;
  }
  &:active {

  }
  &.liked {
    color: var(--color-logo-yellow);
  }
`;

export default ActionBar;