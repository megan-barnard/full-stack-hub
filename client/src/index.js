import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Context
import { CreatePostProvider } from "./context/CreatePostContext";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { PostFeedProvider } from "./context/PostFeedContext";

ReactDOM.render(
  <CurrentUserProvider>
    <PostFeedProvider>
      <CreatePostProvider>
        <App />
      </CreatePostProvider>
    </PostFeedProvider>
  </CurrentUserProvider>

  , document.getElementById("root")
);
