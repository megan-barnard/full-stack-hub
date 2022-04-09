import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

// Import Components
import Navbar from "./Navbar";
import HomeFeed from "./Feed/HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import PostDetails from "./Post/PostDetails";
import UserSearch from "./Feed/UserSearch";
import Login from "./AccountActions/Login";
import Signup from "./AccountActions/Signup";
import EditPassword from "./AccountActions/EditPassword";
import ForgotPassword from "./AccountActions/ForgotPassword";
import Spinner from "./Spinner";
import Footer from "./Footer";


const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact path="/profile/:id/edit">
            <Profile />
          </Route>
          <Route exact path="/post/:id">
            <PostDetails />
          </Route>
          <Route exact path="/search">
            <UserSearch />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/edit-password">
            <EditPassword />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  margin: 0 auto;
  width: 80%;
`;

export default App;
