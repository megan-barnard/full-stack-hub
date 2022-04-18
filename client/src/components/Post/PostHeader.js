import styled from "styled-components";
import { Avatar, DisplayName, UnstyledLink } from "../Styles";
import moment from "moment";
import { FaBriefcase, FaLaptopCode, FaUserAlt } from "react-icons/fa";

const PostHeader = ({ user, timestamp, category }) => {
  const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds/1000000)
  let postDate = moment(date).calendar(); 
  return (
    <Wrapper>
      <Info>
        <UnstyledLink to={`/profile/${user.id}`}><Avatar src={user.avatarSrc} alt={user.displayName} loading="lazy"></Avatar></UnstyledLink>
        <div>
          <UnstyledLink to={`/profile/${user.id}`}><DisplayName>{user.displayName}</DisplayName></UnstyledLink>
          <Handle><UnstyledLink to={`/profile/${user.id}`}>@{user.username}</UnstyledLink><span> · {postDate}</span></Handle>
        </div>
      </Info>
      <CategoryIcon>
        {category === 'career' && <FaBriefcase size={25} />}
        {category === 'project' && <FaLaptopCode size={25} />}
        {category === 'personal' && <FaUserAlt size={25} />}
      </CategoryIcon>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Handle = styled.span`
  color: var(--color-grey);
  & a {
    color: var(--color-grey);
  }
`;

const CategoryIcon = styled.div`
  color: var(--color-grey);
`;

export default PostHeader;