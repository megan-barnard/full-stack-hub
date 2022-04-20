import styled from "styled-components";
import { Avatar, UnstyledLink } from "../Styles";

const User = ({ user }) => {
  return (
    <Wrapper>
      <Avatar src={user.profile ? user.profile.avatarSrc : user.avatarSrc} />
      <UnstyledLink to={`/profile/${user.id}`}>
        <DisplayName>{(user.profile && user.profile.displayName) ? user.profile.displayName : user.displayName}</DisplayName>
        <Username>@{ user.username }</Username>
      </UnstyledLink>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid var(--color-lighter-grey);
`;

const NoAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid var(--color-light-grey);
  background-color: var(--color-grey);
`;

const DisplayName = styled.div`
  font-size: 100%;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Username = styled.div`
  font-size: 90%;
`;

export default User;