import React, { useRef } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LogoImg from "../assets/logo.png";
import MyNavbar from "../components/common/MyNavbar";
import CommonLayout from "../layouts/CommonLayout";
import { customAxois } from "../utils/CustomAxios";

//회원가입
const Join = () => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
  });

  const navigate = useNavigate();

  const validateFields = () => {
    //validation check
    //1. 빈값이 없는지
    //2. id,pw 형식에 맞는지(영어, 숫자 조합 몇글자 이상) - 정규식 사용
    //3. pw 두번 입력하는거 두 개 같은지
    const { idElement, pwElement, pw2Element, simpleDescElement } =
      refs.current;
    if (idElement.value === "") {
      alert("아이디를 입력해주세요");
      idElement.focus();
      return false;
    }
    if (pwElement.value === "") {
      alert("비밀번호를 입력해주세요");
      pwElement.focus();
      return false;
    }
    if (pw2Element.value === "") {
      alert("비밀번호 확인을 입력해주세요");
      pw2Element.focus();
      return false;
    }
    if (simpleDescElement.value === "") {
      alert("한 줄 소개를 입력해주세요");
      simpleDescElement.focus();
      return false;
    }
    //3 pw 두번 입력하는거 두 개 같은지 확인
    if (pwElement.value !== pw2Element.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pw2Element.focus();
      return false;
    }
    //위에 다통과하면 true
    return true;
  };

  const requestJoin = () => {
    // 회원가입요청 함수
    const { idElement, pwElement, pw2Element, simpleDescElement } =
      refs.current;
    //validateFields === false
    if (!validateFields()) {
      return;
    }

    //서버 통신
    //1.jquert ajax
    //2. js fetch
    //3. 외부 라이브러리 axios

    const user = {
      id: idElement.value,
      password: pwElement.value,
      simpleDescElement: simpleDescElement.value,
    };
    // publicAxios : 서버랑 통신하는 구조
    // then : 예상 가능한 에러 처리
    // catch : 예상 못한 에러 처리
    // finally : 에러가 뜨든 안 뜨든 실행할 코드
    customAxois
      .publicAxios({
        method: "post",
        url: "/v1/api/user/join",
        data: user,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("회원가입에 성공했습니다.");
          navigate("/login");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        //?(옵셔녈 체이닝) = null이 아닐경우에만 반환 만약 ?값에 null이면 undefined를
        if (error?.response?.data?.detail != null) {
          alert(JSON.stringify(error?.response?.data?.detail));
        } else {
          alert("알 수 없는 오류");
        }
      })
      .finally(() => {});
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
