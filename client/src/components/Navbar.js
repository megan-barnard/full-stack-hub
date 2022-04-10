import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaBell, FaSearch } from "react-icons/fa";


// import { CurrentUserContext } from "./CurrentUserContext";

const Navbar = () => {
  // const { currentUser } = useContext(CurrentUserContext);
  // const loggedInUser = currentUser ? currentUser.handle : '';
  
  const currentUser = 'testacc1';
  const isLoggedIn = true;

  const handleLogout = () => {
    console.log('logout');

  };

  return (
    <Wrapper>
      <LogoLink to="/"><Logo>Logo</Logo></LogoLink>
      <NavLinks>
        <NavbarLink exact to="/" activeClassName="active"><MenuItem><FaHome /></MenuItem></NavbarLink>
        <NavbarLink to={`/profile/${currentUser}`} activeClassName="active"><MenuItem><FaUserAlt /></MenuItem></NavbarLink>
        <NavbarLink exact to="/notifications" activeClassName="active"><MenuItem><FaBell /></MenuItem></NavbarLink>
        <NavbarLink exact to="/search" activeClassName="active"><MenuItem><FaSearch /></MenuItem></NavbarLink>
      </NavLinks>
      {isLoggedIn
        ? <Logout onClick={() => handleLogout()}><MenuItem> Logout </MenuItem></Logout>
        : <NavbarLink to="/login"><MenuItem> Login </MenuItem></NavbarLink>
      }
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  height: var(--navbar-height);
  width: 100%;
  padding: 0 25px;
  background-color: var(--color-dark-grey);
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover > * {
    color: var(--primary-button-active);
  }
`;

const Logo = styled.h1`
font-family: var(--font-logo);
  color: var( --logo-color);
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavbarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0 10px;
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

// --primary-button-color: #0d0d0d;
// --primary-button-active: rgba(255,255,255,0.7);
// --primary-button-background: #ffffff;

export default Navbar;
