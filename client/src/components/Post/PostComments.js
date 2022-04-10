import styled from "styled-components";
import { NavLink } from "react-router-dom";

const PostComments = ({post}) => {
  return (
    <Wrapper>
      <ViewAll exact to={`/post/${post.id}`}>View all comments</ViewAll>
      <Comment>Cool post</Comment>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 30px;
  border: 1px solid black;

  padding: 10px;
`;

const ViewAll = styled(NavLink)`

`;

const Comment = styled.div`
  margin: 30px;
  border: 1px solid black;
  
  padding: 25px;

`;

export default PostComments;