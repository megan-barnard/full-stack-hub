import moment from "moment";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Avatar, DarkBtn, DisplayName, UnstyledLink } from "../Styles";
import { FaCalendar, FaEdit } from "react-icons/fa";

import { UserContext } from "../../context/UserContext";
import { PostFeedContext } from "../../context/PostFeedContext";
import SocialLinks from "./SocialLinks";
import UserList from "../UserLists/UserList";
import Modal from "../Modal";

const ProfileHeader = () => {
  const { currentUser, followUser } = useContext(UserContext);
  const { userDetails } = useContext(PostFeedContext);
  const [ followingUser, setFollowingUser ] = useState(false);
  const [ followCount, setFollowCount ] = useState(userDetails.followerIds.length);
  const [ showFollowerModal, setShowFollowerModal ] = useState(false);
  const [ showFollowingModal, setShowFollowingModal ] = useState(false);
  const date = new Date(userDetails.profile.joined._seconds * 1000 + userDetails.profile.joined._nanoseconds/1000000);
  const joinedDate = moment(date).calendar(); 
  
  useEffect(() => {
    if (currentUser.id) setFollowingUser(userDetails.followerIds.includes(currentUser.id));
  },[currentUser]);

  const handleFollowUser = () => {
    if (!currentUser.id) return;
    const newFollowStatus = !followingUser;
    const newFollowCount = followCount + (newFollowStatus ? 1 : -1);
    setFollowingUser(newFollowStatus);
    setFollowCount(newFollowCount);
    followUser({ uid: currentUser.id, followId: userDetails.id, followerState: newFollowStatus });
  };

  const toggleFollowerModal = () => {
    const toggleFollower = !showFollowerModal;
    setShowFollowerModal(toggleFollower);
  };

  const toggleFollowingModal = () => {
    const toggleFollowing = !showFollowingModal;
    setShowFollowingModal(toggleFollowing);
  };

  return (
    <>
      <Modal handleClose={toggleFollowerModal} show={showFollowerModal} title="Followers" children={<UserList userIds={userDetails.followerIds} userLabel={'Followers'} modalVisible={showFollowerModal} />} />
      <Modal handleClose={toggleFollowingModal} show={showFollowingModal} title="Following" children={<UserList userIds={userDetails.followingIds} userLabel={'Following'} modalVisible={showFollowingModal} />} />
      <SocialLinks user={userDetails.profile} />
      {currentUser.id === userDetails.id ? (<EditProfile><UnstyledLink to="/editprofile"><FaEdit size={25}/></UnstyledLink></EditProfile>) : (
        <FollowDiv>
          <FollowBtn onClick={handleFollowUser} className={followingUser ? 'following' : ''}>{followingUser ? 'Unfollow' : 'Follow'}</FollowBtn>
        </FollowDiv>
      )}

      <Wrapper>
        <AvatarHeader src={userDetails.profile.avatarSrc} alt={userDetails.profile.displayName} />
        <DisplayName>{userDetails.profile.displayName}</DisplayName> 
        <Handle>@{userDetails.username}</Handle> 
        <Info>
          <Joined><FaCalendar size={13}/> Joined {joinedDate}</Joined>
          <Bio>{userDetails.profile.bio}</Bio>
          {userDetails.profile.languages && <Languages><span>Languages:</span> {userDetails.profile.languages}</Languages>}
          {userDetails.profile.cohort && <Cohort><span>Cohort:</span> {userDetails.profile.cohort}</Cohort>}
          <FollowerDiv>
            <Followers onClick={toggleFollowerModal}><span>{followCount}</span> followers</Followers>
            <Followers onClick={toggleFollowingModal}><span>{userDetails.followingIds.length}</span> following</Followers>
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
  margin: 15px;
  & svg {
    margin-right: 8px;
  }
`;

const Bio = styled.div`
  margin-left: 15px;
`;

const Cohort = styled.div`
  margin: 0 15px 15px 15px;
  & span {
    font-weight: bold;
  }
`;

const Languages = styled.div`
  margin: 15px;
  & span {
    font-weight: bold;
  }
`;

const FollowerDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  border-top: 1px solid var(--color-light-grey);
  border-bottom: 1px solid var(--color-light-grey);
  background-color: var(--color-light-grey);
`;

const Followers = styled.button`
  display: flex;
  align-items: center;
  & span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const FollowDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 10px;
  margin-bottom: -45px;
  & .following {
    background-color: var(--color-accent);
  }
`;

const FollowBtn = styled(DarkBtn)`
  font-size: 100%;
`;

export default ProfileHeader;