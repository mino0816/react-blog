import React from "react";
import { Card, Col, Image, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoImage from "../../assets/no-image.png";
import LikeImg from "../../assets/like.svg";

const blogCardContainer = {
  height: "150px",
  overflow: "hidden",
  width: "200px",
};

const blogCardImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  cursor: "pointer", //마우스 커서 손모양으로 바뀜
};

const blogCardText = {
  display: "-webkit-box",
  wordWrap: "break-word",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
};

const blogTitle = {
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const MyCard = ({ key, post }) => {
  const navigate = useNavigate();

  return (
    <Col>
      <Card className="m-3">
        <div style={blogCardContainer}>
          <Card.Img
            variant="top"
            src={post.thumbnail ? post.thumbnail : NoImage}
            style={blogCardImage}
            alt="No Image"
            onClick={() => navigate(`/post/${post.idx}`)} //상세보기 들어감
          />
        </div>
        <Card.Body>
          <Card.Title
            style={blogTitle}
            onClick={() => navigate(`/post/${post.idx}`)}
          >
            {post.title}
          </Card.Title>
          <Card.Text style={blogCardText}>{post.summary}</Card.Text>
          <small className="text-muted">
            {post.createDate.substring(0, 10)}
          </small>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <InputGroup>
                <Image
                  src={post.writer.profileImage}
                  alt="profile"
                  className="ratio rounded-circle me-2"
                  style={{ width: "24px", height: "24px" }}
                />
                <strong>{post.writer.id}</strong>
              </InputGroup>
            </Col>
            <Col className="col-auto">
              <InputGroup>
                <Image src={LikeImg} width="15px" />
                <span className="mx-2 fs-6 text-black-50">{post.like}</span>
              </InputGroup>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MyCard;
