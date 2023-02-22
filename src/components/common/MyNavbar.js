import React, { useRef } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import AuthStore from "../../stores/AuthStore";
import SearchImg from "../../assets/search.png";

const MyNavbar = ({ post, setPost }) => {
  const navigate = useNavigate();
  const authStore = AuthStore();
  const location = useLocation();
  const searchForm = useRef(null);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("rememberId");
    navigate("/login");
  };

  const searchPost = () => {
    const keyword = searchForm.current.value;
    // console.log(post);
    const result = post.filter((p) => p.title.includes(keyword));
    setPost(result);
    //const[searchResult, setSearchResult]= useState()
  };

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Navbar>
        <Link to={"/"}>
          <Image src={LogoImg} style={{ height: "40px" }} />
        </Link>
        {location.pathname === "/" ? (
          <div style={{ width: "500px" }}>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="search"
                ref={(r) => (searchForm.current = r)}
              />
              <button className="btn" type="button" onClick={searchPost}>
                <image src={SearchImg} width={"20"} />
              </button>
            </Form>
          </div>
        ) : null}

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
                      <Image
                        src={authStore.loginUser.profileImage}
                        className="rounded-circle"
                        style={{
                          widows: "35px",
                          height: "35px",
                          marginLeft: "10px",
                        }}
                      />
                    }
                  >
                    <Link to={"/my"} className="dropdown-item">
                      마이페이지
                    </Link>
                    <Dropdown.Divider />
                    <Anchor
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        logout();
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
