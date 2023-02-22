import React from "react";
import MyNavbar from "../components/common/MyNavbar";

const CommonLayout = ({ children, post, setPost }) => {
  return (
    <div>
      <MyNavbar post={post} setPost={setPost} />
      {children}
    </div>
  );
};

export default CommonLayout;
