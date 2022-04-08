import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Switch>
          <Route exact path="/"></Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div``;

export default App;
