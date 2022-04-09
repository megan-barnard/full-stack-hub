import styled from "styled-components";
import { users, posts } from "../../assets/testData";

const PostHeader = ({postId}) => {
  const post =  posts[postId];
  const user = users[post.authorHandle];
  console.log(user, posts[postId]);
  return (
    <Wrapper>
      <Avatar src={user.avatarSrc} alt={user.displayName}></Avatar>
      <Name>
        <DisplayName>{user.displayName}</DisplayName>
        <Handle>{user.id}</Handle>
      </Name>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid white;
`;

const Name = styled.div`
  
`;

const Handle = styled.div`

`;

const DisplayName = styled.div`
  font-weight: bold;
  font-size: 120%;
`;

export default PostHeader;