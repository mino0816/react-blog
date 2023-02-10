import React, { useRef } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import LogoImg from "../assets/logo.png";
import MyNavbar from "../components/common/MyNavbar";
import CommonLayout from "../layouts/CommonLayout";

//회원가입
const Join = () => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
  });

  const requestJoin = () => {
    // 회원가입요청 함수
    const { idElement, pwElement, pw2Element, simpleDescElement } =
      refs.current;
    console.log(idElement.value);
    console.log("회원가입요청");
  };
  //순수 리액트 훅스x
  // const qs = useLocation();
  // console.log(qs);
  // const arr = qs.search.split("?");
  // console.log("arr", arr);
  // const arr2 = arr[1].split("&");
  // console.log("arr2", arr2);
  // const arr3 = arr2[0].split("=");
  // console.log("arr3", arr3);

  // const [searchParams, setSearchParams] = useSearchParams();

  // const name = searchParams.get("name");
  // const data = searchParams.get("data");
  // console.log("name", name, ", data ", data);
  return (
    <div>
      <CommonLayout />
      <Card style={{ borderRadius: "1rem" }}>
        <Card.Body>
          <h3>
            <img src={LogoImg} style={{ height: "100px" }} />
          </h3>
          {/* 아이디, 비밀번호, 소개 */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="idAddOn">아이디</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.idElement = r)}
              type="text"
              placeholder="아이디를 입력해주세요."
            />
          </InputGroup>

          {/*DB가로줄 row 세로줄 column */}
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="pwAddOn">비밀번호</InputGroup.Text>
                <Form.Control
                  ref={(r) => (refs.current.pwElement = r)}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="pw2AddOn">비번확인</InputGroup.Text>
                <Form.Control
                  ref={(r) => (refs.current.pw2Element = r)}
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-3">
            <InputGroup.Text id="simpleDescAddOn">한줄소개</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.simpleDescElement = r)}
              type="text"
              placeholder="자신을 소개할 말을 써주세요."
            />
          </InputGroup>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={requestJoin}
          >
            회원가입
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Join;
