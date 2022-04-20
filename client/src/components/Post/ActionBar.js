import styled from "styled-components";
import { FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { useContext, useState } from "react";
import { UnstyledLink } from "../Styles";

import Modal from "../Modal";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import UserList from "../UserLists/UserList";

const ActionBar = ({ postId, likedBy, comments }) => {
  const { currentUser } = useContext(UserContext);
  const { likePost } = useContext(PostContext);
  const [ likedByUser, setLikedByUser ] = useState(likedBy.includes(currentUser.id));
  const [ likeCount, setLikeCount ] = useState(likedBy.length);
  const [ copyText, setCopyText ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);

  const handleLike = () => {
    if (!currentUser || !currentUser.id) return;
    const newLike = !likedByUser;
    const newLikeCount = likeCount + (newLike ? 1 : -1);
    setLikedByUser(newLike);
    setLikeCount(newLikeCount);
    likePost({postId, uid: currentUser.id, like: newLike});
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 1000);
    
  };

  const toggleLikeModal = () => {
    const toggleModal = !showModal;
    setShowModal(toggleModal);
  };

  return (
    <Wrapper>
      <Modal handleClose={toggleLikeModal} show={showModal} title="Likes" children={<UserList userIds={likedBy} userLabel={'Likes'} modalVisible={showModal} />} />
      <StatsDiv>
        <LikeCount onClick={toggleLikeModal}><FaThumbsUp size={20} /><span>{likeCount}</span></LikeCount>
        <UnstyledLink to={`/post/${postId}`}><CommentCount> <span>{comments.length}</span> comments</CommentCount></UnstyledLink>
      </StatsDiv>
      <ActionDiv>
        <ActionBarBtn onClick={handleLike} className={likedByUser ? 'liked' : ''}><FaThumbsUp size={27} /></ActionBarBtn>
        <UnstyledLink to={`/post/${postId}`}><FaRegComment size={27} /></UnstyledLink>
        <ActionBarBtn onClick={handleShare}><FaShare size={27} /></ActionBarBtn>
      </ActionDiv>
      {copyText && <ShareLinkDiv><ShareLink></ShareLink><ShareLink></ShareLink><ShareLink>Link Coppied</ShareLink></ShareLinkDiv>}
    </Wrapper>
  )
};

const Wrapper = styled.div``;

const StatsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid var(--color-lighter-grey);
`;

const ActionDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid var(--color-lighter-grey);
`;

const ActionBarBtn = styled.button`
  color: var(--primary-button-color);
  &:hover svg {
    opacity: 0.55;
  }
  &:active {
    transform: scale(0.96);
  }
  &.liked {
    color: var(--color-like);
  }
`;

const LikeCount = styled.button`
  display: flex;
  align-items: center;
  font-family: var(--font-logo);
  font-weight: bold;
  font-size: 120%;
  & svg {
    margin-right: 5px;
    color: var(--color-like);
  }
`;

const CommentCount = styled.div`
  font-family: var(--font-logo);
  font-size: 100%;
  & span {
    font-weight: bold;
    font-size: 120%;
  }
`;

const ShareLinkDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: -16px;
`;

const ShareLink = styled.div`
  width: 100%;
  text-align: center;
  transition: 2s;
`;

export default ActionBar;