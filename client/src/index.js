import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Context
import { UserProvider } from "./context/UserContext";
import { PostFeedProvider } from "./context/PostFeedContext";
import { PostProvider } from "./context/PostContext";

ReactDOM.render(
  <UserProvider>
    <PostFeedProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </PostFeedProvider>
  </UserProvider>

  , document.getElementById("root")
);
