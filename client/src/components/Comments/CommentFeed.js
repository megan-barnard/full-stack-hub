import styled from "styled-components";
import Comment from "./Comment";

const CommentFeed = ({ comments }) => {
  return (
    (comments && comments.length) ? (
      <Wrapper>
        {comments.map((comment, index) => <Comment key={`comment-${index}`} userId={comment.uid} comment={comment.commentBody} />)}
      </Wrapper>
    ) : (<div></div>)
  )
};

const Wrapper = styled.div`
  border: 1px solid var(--color-lighter-grey);
  margin: 25px;
  border-radius: 5px;
`;

export default CommentFeed;