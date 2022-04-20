import styled from "styled-components";
import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FaHome, FaPaperPlane, FaPlusSquare, FaBell, FaSearch, FaQrcode } from "react-icons/fa";
import { Avatar } from "./Styles";

import { UserContext } from "../context/UserContext";


const Navbar = () => {
  const { currentUser, logoutCurrentUser, generateRandomUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    logoutCurrentUser();
    history.push("/");
  };

  return (
    <Wrapper>
      <NavDiv>
        <LogoLink to="/"><FaQrcode size={30} /><Logo>Full Stack Hub</Logo></LogoLink>
      </NavDiv>
      <NavDiv>
        <NavbarLink exact to="/" activeClassName="active"><MenuItem><FaHome /></MenuItem></NavbarLink>
        <NavbarLink exact to="/messages" activeClassName="active"><MenuItem><FaPaperPlane /></MenuItem></NavbarLink>
        <NavbarLink exact to="/create" activeClassName="active"><MenuItem><FaPlusSquare /></MenuItem></NavbarLink>
        <NavbarLink exact to="/notifications" activeClassName="active"><MenuItem><FaBell /></MenuItem></NavbarLink> 
        <NavbarLink exact to="/search" activeClassName="active"><MenuItem><FaSearch /></MenuItem></NavbarLink>

        {!currentUser ? (<NavbarLink to="/signup"><MenuItem> Signup </MenuItem></NavbarLink>) : (
          <>
            <NavbarLink to={`/profile/${currentUser.id}`}>
              {(currentUser.profile && currentUser.profile.avatarSrc) ? <NavAvatar src={currentUser.profile.avatarSrc} /> : <NavNoAvatar></NavNoAvatar>}
            </NavbarLink>
            <Logout onClick={handleLogout}><MenuItem> Logout </MenuItem></Logout>
          </>
        )} 
      </NavDiv>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 99998;
  height: var(--navbar-height);
  width: 100%;
  padding: 0 25px;
  background-color: var(--color-dark-grey);
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover > h1 {
    color: var(--primary-button-active);
  }
  & svg {
    color: var(--color-logo);
    margin-right: 10px;
  }
`;

const Logo = styled.h1`
  font-family: var(--font-logo);
  color: var( --logo-color);

  @media screen and (max-width: 949px) { 
    display: none;
  }
`;

const NavDiv = styled.div`
  display: flex;
`;

const NavbarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0 5px;
  text-decoration: none;

  &:hover > * {
    background-color: var(--primary-button-active);
  }
  &:active > * {
    transform: translateY(1px);
  }
  &.active div {
    background-color: var(--primary-button-active);
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: bold;
  background-color: var(--primary-button-background);
  color: var(--primary-button-color);

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const NavAvatar = styled(Avatar)`
  height: 40px;
  width: 40px;
`;

const NavNoAvatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid var(--color-light-grey);
  background-color: white;
`;

const Logout = styled.button`
  display: flex;
  align-items: center;

  &:hover > * {
    background-color: var(--primary-button-active);
  }
  &:active > * {
    transform: translateY(1px);
  }
`;

export default Navbar;
