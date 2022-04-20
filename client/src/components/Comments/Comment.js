import { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../Styles";

const Comment = ({ userId, comment }) => {
  const [ commentUser, setCommentUser ] = useState({ avatar: '', name: '' });

  useEffect(() => {
    getUserDetails(userId);
  }, []);

  const getUserDetails = (userId) => {
    fetch(`/api/get-user/${userId}`)
    .then(res => res.json())
    .then(({data}) => setCommentUser({ avatar: data.profile.avatarSrc, name: data.profile.displayName }));
  };

  return (
    <Wrapper>
      {commentUser.avatar ? <UserAvatar src={commentUser.avatar} loading="lazy" /> : <NoAvatar></NoAvatar>}
      <CommentBody>
        <CommentAuthor>{ commentUser.name }</CommentAuthor>
        <CommentText>{ comment }</CommentText>
      </CommentBody>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid var(--color-lighter-grey);
`;

const UserAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
`;

const CommentBody = styled.div`
  width: 100%;
`;

const CommentAuthor = styled.div`
  font-size: 90%;
  font-weight: 600;
`;

const CommentText = styled.div`
  font-size: 90%;
  margin-top: 5px;
`;

const NoAvatar = styled.div`
  width: 35px;
  height: 35px;
  background-color: white;
  border: 2px solid var(--color-light-grey);
  border-radius: 50%;
`;

export default Comment;