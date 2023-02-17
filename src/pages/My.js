import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import AuthStore from "../stores/AuthStore";
import { customAxois } from "../utils/CustomAxios";
import MyCard from "../components/common/MyCard";

//마이페이지
//내 정보, 내가 쓴 글, 좋아요 한 글
const My = () => {
  const authStore = AuthStore();
  const navigate = useNavigate();

  const [myPostList, setMyPostList] = useState([]);
  const [likePostList, setLikePostList] = useState([]);

  //정보 가져오기
  const getMyInfo = () => {
    customAxois
      .privateAxios({
        method: "get",
        url: "/v1/api/user/my",
      })
      .then((response) => {
        if (response.status === 200) {
          setLikePostList(response.data.content.likePostList);
          setMyPostList(response.data.content.myPostList);
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

  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    getMyInfo();
  }, []);

  return (
    <CommonLayout>
      {authStore.loginUser ? (
        <div>
          <Container>
            <Row className="row-cols-2 justify-content-center my-5">
              <Col>
                <div className="d-flex justify-content-center">
                  <img
                    src={authStore.loginUser.profileImage}
                    className="ratio rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                    alt="profile"
                  />
                </div>
              </Col>
              <Col>
                <h2>{authStore.loginUser.id}</h2>
                <p>{authStore.loginUser.simpleDesc}</p>
                <Link to="/change-info">내 정보 수정</Link>
              </Col>
            </Row>
            <hr className=" border-3" />
          </Container>
          <Container className="mt-5">
            <Row className="row-cols-1 row-cols-md-2">
              <Col>
                <h5 className="text-center">내 글</h5>
                <Row className="row-cols-1 card-group my-5">
                  {myPostList.map((post, index) => (
                    <MyCard ket={index} post={post} />
                  ))}
                </Row>
              </Col>
              <Col>
                <h5 className="text-center">좋아요 한 글</h5>
                <Row className="row-cols-1 card-group my-5">
                  {likePostList.map((post, index) => (
                    <MyCard ket={index} post={post} />
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </CommonLayout>
  );
};

export default My;
