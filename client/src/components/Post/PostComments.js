import { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import CommentFeed from "../Comments/CommentFeed";
import { DarkBtn } from "../Styles";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";

const PostComments = ({post}) => {
  const { currentUser } = useContext(UserContext);
  const { commentStatus, setCommentStatus, commentOnPost } = useContext(PostContext);
  const [ currentComment, setCurrentComment ] = useState('');
  const [ commentError, setCommentError ] = useState('');
  const [ postComments, setPostComments ] = useState(post.comments);

  useEffect(() => {
    setCommentError('');
    setCurrentComment('');
    setCommentStatus({ success: false, postId: '' });
  },[]);

  useEffect(() => {
    if (commentStatus.success && post.id === commentStatus.postId) {
      const newPostComments = [ ...postComments, {uid: currentUser.id, commentBody: currentComment}];
      setPostComments(newPostComments);
      setCommentStatus({ success: false, postId: ''});
      setCommentError('');
      setCurrentComment('');
    } 
  },[commentStatus]);

  const handleChange = (ev) => {
    const updatedComment = ev.target.value;
    setCurrentComment(updatedComment);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setCommentError('');
    if (currentUser.id && currentComment && post.id) {
      commentOnPost({ postId: post.id, uid: currentUser.id, commentBody: currentComment });
    } else {
      if (!currentUser.id) return setCommentError('Must be logged in to comment.')
      if (!currentComment) return setCommentError('Comment cannot be blank.')
      setCommentError('Unknown error');
    }
  };

  return (
    <Wrapper>
      <CommentFeed comments={postComments} />
      <CreateCommentForm onSubmit={handleSubmit} autoComplete="off">
        <CommentInput 
          value={currentComment} 
          onChange={handleChange} 
          name="comment" 
          placeholder="Write a comment..."
          autocomplete="false"
        />
        <SubmitComment type="submit">Send</SubmitComment>
      
      </CreateCommentForm>
      {commentError && <ErrorMessage>{ commentError }</ErrorMessage>}     
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin-top: 15px;
`;

const CreateCommentForm = styled.form`
  display: flex;
  margin: 30px 0 10px;
  width: 100%;
`;

const CommentInput = styled.input`
  border: 1px solid var(--color-light-grey);
  font-size: 85%;
  width: 100%;
`;

const SubmitComment = styled(DarkBtn)`
  font-size: 90%;
  margin-left: 5px;
`;

const ErrorMessage = styled.div`
  margin-top: 15px;
  text-align: right;
  font-family: sans-serif;
  font-size: 80%;
  color: red;
`;


export default PostComments;