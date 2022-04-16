import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

// Import Components
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import Notifications from "./Notifications";
import Profile from "./Profile";
import PostDetails from "./Post/PostDetails";
import CreatePost from "./CreatePost/index";
import UserSearch from "./Feed/UserSearch";
import Login from "./AccountActions/Login";
import Signup from "./AccountActions/Signup";
import EditPassword from "./AccountActions/EditPassword";
import ForgotPassword from "./AccountActions/ForgotPassword";
import ErrorMessage from "./ErrorMessage";
import Footer from "./Footer";


const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Main>
        <Switch>
          <Route exact path="/"><HomePage /></Route>
          <Route exact path="/notifications"><Notifications /></Route>
          <Route exact path="/profile/:userId"><Profile /></Route>
          <Route exact path="/profile/:userId/edit"><Profile /></Route>
          <Route exact path="/post/:postId"><PostDetails /></Route>
          <Route exact path="/search"><UserSearch /></Route>
          <Route exact path="/messages"><HomePage /></Route>
          <Route exact path="/create"><CreatePost /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/forgot-password"><ForgotPassword /></Route>
          <Route exact path="/edit-password"><EditPassword /></Route>
          <Route><ErrorMessage message={"Page not found."} /></Route>
        </Switch>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  margin: 0 auto;
  padding-top: var(--navbar-height);
  max-width: 1000px;
  min-width: 300px;
  min-height: calc(100vh - var(--footer-height));
  box-sizing: border-box;
  
  @media screen and (min-width: 950px) {
    width: 900px;
  }
  @media screen and (max-width: 949px) { 
    width: 550px;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`;

export default App;
