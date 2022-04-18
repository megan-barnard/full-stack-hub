import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Context
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { PostFeedProvider } from "./context/PostFeedContext";
import { PostProvider } from "./context/PostContext";

ReactDOM.render(
  <CurrentUserProvider>
    <PostFeedProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </PostFeedProvider>
  </CurrentUserProvider>

  , document.getElementById("root")
);
