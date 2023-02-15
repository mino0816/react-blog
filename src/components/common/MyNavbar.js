import React from "react";
import {
  Anchor,
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import AuthStore from "../../stores/AuthStore";
import SearchImg from "../../assets/search.png";

const MyNavbar = () => {
  const navigate = useNavigate();
  const authStore = AuthStore();

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Navbar>
        <Link to={"/"}>
          <Image src={LogoImg} style={{ height: "40px" }} />
        </Link>
        <Container>
          <div>
            <InputGroup>
              <div>
                {authStore.loginUser ? (
                  <Button
                    variant="success"
                    onClick={() => navigate("/insert-post")}
                    style={{ marginLeft: "10px" }}
                  >
                    새 글 작성
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    로그인
                  </Button>
                )}
              </div>
              <Row>
                {authStore.loginUser ? (
                  <NavDropdown
                    title={
                      <Button variant="success" style={{ marginLeft: "10px" }}>
                        메뉴 열기
                      </Button>
                    }
                  >
                    <div className="dropdown-item">
                      <Form className="d-flex">
                        <Form.Control type="text" placeholder="serarch" />
                        <button className="btn" type="button">
                          <image src={SearchImg} width={"20"} />
                        </button>
                      </Form>
                    </div>
                    <Dropdown.Divider />
                    <Link to={"/my"} className="dropdown-item">
                      마이페이지
                    </Link>
                    <Dropdown.Divider />
                    <Anchor
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        navigate("/login", { replace: true });
                      }}
                    >
                      로그아웃
                    </Anchor>
                  </NavDropdown>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => {
                      navigate("/join");
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    회원가입
                  </Button>
                )}
              </Row>
            </InputGroup>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
