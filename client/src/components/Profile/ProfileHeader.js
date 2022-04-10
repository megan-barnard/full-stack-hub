import styled from "styled-components";
import { Container, Avatar, DisplayName } from "../Styles";
import { FaExternalLinkAlt, FaGithubSquare, FaLinkedin, FaInstagramSquare, FaFacebookSquare, FaUsers, FaCalendar } from "react-icons/fa";
import moment from "moment";

const ProfileHeader = ({user}) => {
  let joinedDate = moment(user.profile.joined).calendar(); 

  return (
    <Wrapper>
      <Banner src={user.profile.bannerSrc} alt={user.profile.displayName} />
      <Header>
        <Col>
          <AvatarHeader src={user.profile.avatarSrc} alt={user.profile.displayName} />
          <div>
            <Joined><FaCalendar size={15}/> Joined {joinedDate}</Joined>
            <DisplayName>{user.profile.displayName}</DisplayName>
            <Handle>@{user.id}</Handle> 
            <Bio>{user.profile.bio}</Bio>
          </div>
        </Col>
        <SocialLinks>
          {user.profile.websiteUrl && <SocialLink target="_blank" href={user.profile.websiteUrl}><FaExternalLinkAlt size={23}/></SocialLink>}
          {user.profile.githubUrl && <SocialLink target="_blank" href={user.profile.githubUrl}><FaGithubSquare size={25}/></SocialLink>}
          {user.profile.linkedinUrl && <SocialLink target="_blank" href={user.profile.linkedinUrl}><FaLinkedin size={25}/></SocialLink>}
          {user.profile.instagramUrl && <SocialLink target="_blank" href={user.profile.instagramUrl}><FaInstagramSquare size={25}/></SocialLink>}
          {user.profile.facebookUrl && <SocialLink target="_blank" href={user.profile.facebookUrl}><FaFacebookSquare size={25}/></SocialLink>}
        </SocialLinks>
      </Header>  
          {/* <FollowerDiv>
            <Followers><FaUsers /> Followers: {user.followerIds.length}</Followers>
            <Followers> Following: {user.followingIds.length}</Followers>
          </FollowerDiv> */}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 200px;
  height: 200px;
  `;

const Banner = styled.img`
  position: absolute;
  top: var(--navbar-height);
  left: 0;
  z-index: -999;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Header = styled.div`
  position: absolute;
  top: calc(var(--navbar-height) + 200px);
  left: 0;
  z-index: 0;
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-dark-grey);

  @media screen and (max-width: 575px) {
    align-items: center;
    margin-left: 0;
  }
`;

const Col = styled.div`
  display: flex;
  float: left;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
`;

const SocialLink = styled.a`
  color: var(--color-dark-grey);
  margin-left: 5px;
`;


const AvatarHeader = styled(Avatar)`
  width: 120px;
  height: 120px;
`;

const Handle = styled.div`
  margin-bottom: 15px;
  color: var(--color-grey);
`;

const Bio = styled.div`
`;

const FollowerDiv = styled.div`
  display: flex;
`;

const Followers = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin-right: 8px;
  }
`;

const Joined = styled.div`
  display: flex;
  align-items: center;
  float: right;
  color: var(--color-grey);
  & svg {
    margin-right: 8px;
  }
`;

export default ProfileHeader;