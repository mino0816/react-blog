import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, CardGroup, Container } from "react-bootstrap";
import CommonLayout from "../layouts/CommonLayout";
import { customAxois } from "../utils/CustomAxios";
import MyCard from "../components/common/MyCard";
//글 목록 02.17날 만듬
const Posts = () => {
  const [post, setPost] = useState([]);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://gangmii.com:8080/v1/api/post",
  //   })
  //     .then((response) => {
  //       console.log(response.data.content);
  //     })
  //     .catch(() => {})
  //     .finally(() => {});
  // }, []);

  const getPost = () => {
    customAxois
      .publicAxios({
        method: "get",
        url: "v1/api/post",
      })
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data.content);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.detail != null) {
          alert(JSON.stringify(error?.response?.data?.detail));
        } else {
          alert("알 수 없는 오류");
        }
      })
      .finally(() => {});
  };

  const reset = () => {
    getPost();
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <CommonLayout post={post} setPost={setPost}>
      <Container>
        <CardGroup>
          {post.map((post, index) => (
            <MyCard key={index} post={post} />
          ))}
        </CardGroup>
        <Button variant="outline-success" onClick={reset} className="mt-2">
          초기화
        </Button>
      </Container>
    </CommonLayout>
  );
};

export default Posts;
