import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

// import { CurrentUserContext } from "./CurrentUserContext";

const Navbar = () => {
  // const { currentUser } = useContext(CurrentUserContext);
  // const loggedInUser = currentUser ? currentUser.handle : '';
  const loggedInUser = 'test';

  return (
    <Wrapper>
      <LinkDiv>
        <NavbarLink exact to="/" activeClassName="active"><MenuItem> Home </MenuItem></NavbarLink>
        <NavbarLink exact to={`/profile/${loggedInUser}`} activeClassName="active"><MenuItem> Profile </MenuItem></NavbarLink>
        <NavbarLink exact to="/notifications" activeClassName="active"><MenuItem> Notifications </MenuItem></NavbarLink>
        <NavbarLink exact to="/search" activeClassName="active"><MenuItem> Search </MenuItem></NavbarLink>
        <NavbarLink exact to="/" activeClassName="active"><MenuItem> Logout </MenuItem></NavbarLink>
        <NavbarLink exact to="/login" activeClassName="active"><MenuItem> Login </MenuItem></NavbarLink>
      </LinkDiv>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  padding: 0 25px;
  background-color: lightgray;
  border-bottom: solid 1px grey;
`;

const LinkDiv = styled.div`
  display: flex;

  .active {
    color: red;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: bold;
  background-color: white;
  color: black;
`;

const NavbarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 10px;
  text-decoration: none;

  &:hover ${MenuItem}{
    background-color: black;
    color: white;
  }
  &:active ${MenuItem}{
    transform: translateY(1px);
  }
`;

export default Navbar;
