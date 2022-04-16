import styled from "styled-components";
import { Container, Avatar, DisplayName } from "../Styles";
import { FaExternalLinkAlt, FaGithubSquare, FaLinkedin, FaInstagramSquare, FaFacebookSquare, FaCalendar, FaEllipsisH } from "react-icons/fa";
import moment from "moment";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

const ProfileHeader = ({user}) => {
  let joinedDate = moment(user.profile.joined).calendar(); 
  tippy('#action-edit', {content: "edit profile", arrow: true, theme: 'light', delay: 1000,},);

  const editActionClicked = () => {
    console.log('edit clicked');
  };

  return (
    <>
      <Banner style={{background: user.profile.bannerSrc ? `url(${user.profile.bannerSrc}) no-repeat center` : 'grey'}}>
        <SocialLinks>
          {user.profile.websiteUrl && <SocialLink target="_blank" href={user.profile.websiteUrl}><FaExternalLinkAlt size={24} style={{color: user.profile.iconColor ? user.profile.iconColor : '' }}/></SocialLink>}
          {user.profile.githubUrl && <SocialLink target="_blank" href={user.profile.githubUrl}><FaGithubSquare size={25} style={{color: user.profile.iconColor ? user.profile.iconColor : '' }} /></SocialLink>}
          {user.profile.linkedinUrl && <SocialLink target="_blank" href={user.profile.linkedinUrl}><FaLinkedin size={25} style={{color: user.profile.iconColor ? user.profile.iconColor : '' }} /></SocialLink>}
          {user.profile.instagramUrl && <SocialLink target="_blank" href={user.profile.instagramUrl}><FaInstagramSquare size={25} style={{color: user.profile.iconColor ? user.profile.iconColor : '' }} /></SocialLink>}
          {user.profile.facebookUrl && <SocialLink target="_blank" href={user.profile.facebookUrl}><FaFacebookSquare size={25} style={{color: user.profile.iconColor ? user.profile.iconColor : '' }} /></SocialLink>}
        </SocialLinks>
      </Banner>
      <EditProfile>
        <EditBtn id="action-edit" onClick={() => editActionClicked()}><FaEllipsisH size={25}/></EditBtn>
      </EditProfile>
      <Wrapper>
        <AvatarHeader src={user.profile.avatarSrc} alt={user.profile.displayName} />
        <DisplayName>{user.profile.displayName}</DisplayName> 
        <Handle>@{user.id}</Handle> 
        <Info>
          <Joined><FaCalendar size={13}/> Joined {joinedDate}</Joined>
          <Bio>{user.profile.bio}</Bio>
          <FollowerDiv>
            <Followers><span>{user.followerIds.length}</span> followers</Followers>
            <Followers><span>{user.followingIds.length}</span> following</Followers>
          </FollowerDiv>
        </Info>
      </Wrapper>  
    </>
  )
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid var(--color-light-grey);
  border-right: 1px solid var(--color-light-grey);
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  border-left: 1px solid var(--color-light-grey);
  border-right: 1px solid var(--color-light-grey);
`;

const SocialLinks = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 200px;
  padding: 6px 10px;
    
  @media screen and (max-width: 575px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
  }
`;

const SocialLink = styled.a`
  color: var(--color-dark-grey);
  margin-left: 5px;
  cursor: pointer;
`;

const EditProfile = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 10px;
  margin-bottom: -45px;
`;

const EditBtn = styled.button`

`;

const AvatarHeader = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const Handle = styled.div`
  margin-bottom: 15px;
  color: var(--color-grey);
`;

const Joined = styled.div`
  display: flex;
  align-items: center;
  font-size: 90%;
  color: var(--color-grey);
  margin-left: 10px;
  & svg {
    margin-right: 8px;
  }
`;

const Bio = styled.div`
  margin: 10px;
`;

const FollowerDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  border-top: 1px solid var(--color-light-grey);
  border-bottom: 1px solid var(--color-light-grey);
  background-color: var(--color-light-grey);
`;

const Followers = styled.div`
  display: flex;
  align-items: center;
  & span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

export default ProfileHeader;