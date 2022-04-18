import styled from "styled-components";
import { useContext } from "react";
import moment from "moment";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import { FaExternalLinkAlt, FaGithubSquare, FaLinkedin, FaInstagramSquare, FaFacebookSquare, FaCalendar, FaEllipsisH } from "react-icons/fa";
import { Avatar, DisplayName } from "../Styles";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { PostFeedContext } from "../../context/PostFeedContext";

const ProfileHeader = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { userDetails, userDetailsLoading } = useContext(PostFeedContext);
  
  if (!userDetails || !userDetails.profile || !userDetails.profile.joined) {
    userDetails = {id:"",username:"",profile: {joined:"",displayName:"",avatarSrc:"",bannerSrc:"",iconColor:"#000",bio:"",languages:"",websiteUrl:"",githubUrl:"",linkedinUrl:"",instagramUrl:"",facebookUrl:""},followingIds:[],followerIds:[],likeIds:[],commentIds:[],postIds:[]};
  }

  let joinedDate = moment(userDetails.profile.joined).calendar(); 
  tippy('#action-edit', {content: "edit profile", arrow: true, theme: 'light', delay: 1000,},);

  const editActionClicked = () => {
    console.log('edit clicked');
  };

  return (
    <>
      <Banner style={{background: (userDetails.profile.bannerSrc && userDetails.profile) ? `url(${userDetails.profile.bannerSrc}) no-repeat center` : 'grey'}}>
        <SocialLinks>
          {userDetails.profile.websiteUrl && <SocialLink target="_blank" href={userDetails.profile.websiteUrl}><FaExternalLinkAlt size={24} style={{color: userDetails.profile.iconColor ? userDetails.profile.iconColor : '' }}/></SocialLink>}
          {userDetails.profile.githubUrl && <SocialLink target="_blank" href={userDetails.profile.githubUrl}><FaGithubSquare size={25} style={{color: userDetails.profile.iconColor ? userDetails.profile.iconColor : '' }} /></SocialLink>}
          {userDetails.profile.linkedinUrl && <SocialLink target="_blank" href={userDetails.profile.linkedinUrl}><FaLinkedin size={25} style={{color: userDetails.profile.iconColor ? userDetails.profile.iconColor : '' }} /></SocialLink>}
          {userDetails.profile.instagramUrl && <SocialLink target="_blank" href={userDetails.profile.instagramUrl}><FaInstagramSquare size={25} style={{color: userDetails.profile.iconColor ? userDetails.profile.iconColor : '' }} /></SocialLink>}
          {userDetails.profile.facebookUrl && <SocialLink target="_blank" href={userDetails.profile.facebookUrl}><FaFacebookSquare size={25} style={{color: userDetails.profile.iconColor ? userDetails.profile.iconColor : '' }} /></SocialLink>}
        </SocialLinks>
      </Banner>

      {currentUser.id === userDetails.id && <EditProfile><EditBtn id="action-edit" onClick={() => editActionClicked()}><FaEllipsisH size={25}/></EditBtn></EditProfile>}

      <Wrapper>
        <AvatarHeader src={userDetails.profile.avatarSrc} alt={userDetails.profile.displayName} />
        <DisplayName>{userDetails.profile.displayName}</DisplayName> 
        <Handle>@{userDetails.username}</Handle> 
        <Info>
          <Joined><FaCalendar size={13}/> Joined {joinedDate}</Joined>
          <Bio>{userDetails.profile.bio}</Bio>
          <FollowerDiv>
            <Followers><span>{userDetails.followerIds.length}</span> followers</Followers>
            <Followers><span>{userDetails.followingIds.length}</span> following</Followers>
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