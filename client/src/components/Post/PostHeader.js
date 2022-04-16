import styled from "styled-components";
import { Avatar, DisplayName, UnstyledLink } from "../Styles";
import moment from "moment";
import { FaBriefcase, FaLaptopCode, FaUserAlt } from "react-icons/fa";

const PostHeader = ({post, postAuthor}) => {
  let postDate = moment(post.timestamp).calendar(); 

  // Current time generator
  // let currentTimestamp = moment().format();
  // console.log('current',currentTimestamp);

  return (
    <Wrapper>
      <Info>
        <UnstyledLink to={`/profile/${postAuthor.id}`}><Avatar src={postAuthor.profile.avatarSrc} alt={postAuthor.profile.displayName} loading="lazy"></Avatar></UnstyledLink>
        <Name>
          <UnstyledLink to={`/profile/${postAuthor.id}`}><DisplayName>{postAuthor.profile.displayName}</DisplayName></UnstyledLink>
          <Handle><UnstyledLink to={`/profile/${postAuthor.id}`}>@{postAuthor.id}</UnstyledLink><span> · {postDate}</span></Handle>
        </Name>
      </Info>
      <CategoryIcon>
        {post.category === 'career' && <FaBriefcase size={25} />}
        {post.category === 'project' && <FaLaptopCode size={25} />}
        {post.category === 'personal' && <FaUserAlt size={25} />}
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

const Name = styled.div`
  
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