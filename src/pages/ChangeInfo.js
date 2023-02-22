import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckUserModal from "../components/common/CheckUserModal";
import CommonLayout from "../layouts/CommonLayout";
import AuthStore from "../stores/AuthStore";
import { customAxois } from "../utils/CustomAxios";

//회원정보 수정
const ChangeInfo = () => {
  const [modalShow, setModalShow] = useState(true);

  const navigate = useNavigate();
  const authStore = AuthStore();

  const handlModalClose = () => {
    navigate("/my");
  };

  const modalCallback = (token) => {
    localStorage.setItem("accessToken", token.accessToken);
    authStore.setLoginUserByToken(token.accessToken);
    setModalShow(false);
  };
  const myRefs = useRef({
    profileImageElement: null,
    fileElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDesc: null,
  });
  //이미지가 아무것도 안 들어가는거 방지
  const setDefaultProfileImg = () => {
    myRefs.current.profileImageElement.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  const setChangeProfileImg = () => {
    //파일 변경
    //서버에서 파일 받아서 클라우드라던지 어딘가 저장
    //db->url

    const fileElement = myRefs.current.fileElement;

    //널체크
    if (fileElement.files && fileElement.files[0]) {
      const myFile = fileElement.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        myRefs.current.profileImageElement.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(myFile);
    }
  };
  const validateFields = () => {
    const { pwElement, pw2Element } = myRefs.current;
    //비밀번호 두개 같은지
    if (pwElement.value !== pw2Element.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pw2Element.focus();
      return false;
    }
    return true;
  };
  const requestChangeInfo = () => {
    //유효성체크 validate
    if (!validateFields()) {
      return;
    }
    //axios
    const user = {
      profileImage: myRefs.current.profileImageElement.src,
      password: myRefs.current.pwElement.value
        ? myRefs.current.pwElement.value
        : null,
      simpleDesc: myRefs.current.simpleDescElement.value
        ? myRefs.current.simpleDescElement.value
        : null,
    };

    customAxois
      .privateAxios({
        method: "post",
        url: "v1/api/user/info/change",
        data: user,
      })
      .then(
        //console.log(response)
        (response) => {
          console.log(response);
          if (response.status === 200) {
            alert("정보 수정에 성공했습니다.");
            navigate("/login");
          } else {
            alert(response.data.message);
          }
        }
      )
      .catch((error) => {
        if (error?.response?.data?.detail != null) {
          alert(JSON.stringify(error?.response?.data?.detail));
        } else {
          alert("알 수 없는 오류");
        }
      })
      .finally(() => {});
  };

  if (modalShow) {
    return (
      <CheckUserModal
        modalShow={modalShow}
        modalClose={handlModalClose}
        callback={modalCallback}
      ></CheckUserModal>
    );
  }
  return (
    <CommonLayout>
      <Card className="shadow-2-strong" style={{ borderRadius: "1rem" }}>
        <Card.Body className="p-5 text-center">
          <h2 className="mb-3">내 정보 수정</h2>
          <div className="d-flex justify-content-center">
            <span>
              <Image
                ref={(r) => (myRefs.current.profileImageElement = r)}
                src={authStore.loginUser.profileImage}
                className="ratio rounded-circle"
                alt="profile"
                style={{ width: "100px", height: "100px" }}
              />
              <Form.Control
                ref={(r) => (myRefs.current.fileElement = r)}
                type="file"
                accept="image/*"
                className="mb-3 mt-3"
                style={{ width: "100px" }}
                onClick={setDefaultProfileImg}
                onChange={setChangeProfileImg}
              />
            </span>
          </div>
          <InputGroup className="mb-3">
            <InputGroup.Text>아이디</InputGroup.Text>
            <Form.Control
              defaultValue={authStore.loginUser.id}
              type="text"
              disabled
            />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text>비밀번호</InputGroup.Text>
                <Form.Control
                  type="password"
                  ref={(r) => (myRefs.current.pwElement = r)}
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text>비밀번호 확인</InputGroup.Text>
                <Form.Control
                  type="password"
                  ref={(r) => (myRefs.current.pw2Element = r)}
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-3">
            <InputGroup.Text>한줄 소개</InputGroup.Text>
            <Form.Control
              ref={(r) => (myRefs.current.simpleDescElement = r)}
              type="text"
              defaultValue={authStore.loginUser.simpleDesc}
            />
          </InputGroup>
          <Row>
            <Col>
              <Button
                variant="outline-danger"
                type="button"
                style={{ width: "200px" }}
                onClick={() => navigate("/my")}
              >
                취소
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-success"
                type="button"
                style={{ width: "200px" }}
                onClick={requestChangeInfo}
              >
                수정
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </CommonLayout>
  );
};

export default ChangeInfo;
