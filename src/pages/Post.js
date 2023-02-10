import React from "react";
import { useParams } from "react-router-dom";

//글 상세보기
const Post = () => {
  const params = useParams();
  console.log(params);
  return <div>Post</div>;
};

export default Post;
