import { Editor } from "@toast-ui/react-editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import WriteLayout from "../layouts/WriteLayout";
import ExitImg from "../assets/exit.svg";
import AuthStore from "../stores/AuthStore";
import { customAxois } from "../utils/CustomAxios";

//로그인 안되있으면 로그인 페이지 이동
//창 크기에 따라 에디터 크기 변경
//기존 게시물 가져와서 채워 넣기
//updatePost
//validation

//글 수정
const UpdatePost = () => {
  const refs = useRef({
    title: null,
    editor: null,
  });

  const navigate = useNavigate();
  const [editorHeight, seteditorHeight] = useState(0);
  //작성된 게시물 가져오기
  //useCallback 함수 재사용 상태가 변경되더라도 원래 상태로 유지 useMemo와 비슷
  const getPost = useCallback(() => {
    if (isNaN(postIdx)) {
      alert("잘못된 접근입니다.");
      return;
    }
    customAxois
      //privateAxios 쓰는 이유 게시글 좋아요 보기위해서 accessToken값도 같이 받아오기 위해서
      .privateAxios({
        method: "get",
        url: `v1/api/post/${postIdx}`,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          refs.current.title.value = response.data.content.title;
          refs.current.editor
            .getInstance()
            .setMarkdown(response.data.content.content);
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
  }, []);

  const validateFields = () => {
    const titleElement = refs.current.title.value;
    const content = refs.current.editor.getInstance().getMarkdown();
    //제목이 빈 값인지
    if (titleElement === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    //내용이 빈 값인지
    if (content === "") {
      alert("내용을 입력해주세요");
      return false;
    }
    return true;
  };

  const updatePost = () => {
    //밸리데이션 체크
    if (!validateFields) {
      return;
    }

    const titleElement = refs.current.title.value;
    const content = refs.current.editor.getInstance().getMarkdown();

    const markdownImageRegex = /\[.*\]\((.*)\)/gi;
    const markdownRegex = /(\*|_|#|`|~|>|!|\[|\]|\(|\)|\{|\}|\||\\)/gi;

    const summary = content
      .replace(markdownImageRegex, "")
      .replace(markdownRegex, "")
      .substring(0, 151);

    const imageList = content.match(markdownImageRegex);
    const thumbnailMarkdown = imageList != null ? imageList[0] : null;

    const thumbnail = thumbnailMarkdown
      ? thumbnailMarkdown.substring(
          thumbnailMarkdown.indexOf("](") + 2,
          thumbnailMarkdown.length - 1
        )
      : null;

    const post = {
      title: titleElement,
      thumbnail: thumbnail,
      content: content,
      summary: summary,
    };

    customAxois
      .privateAxios({
        method: "post",
        url: `v1/api/post/update/${postIdx}`,
        data: post,
      })
      //성공하면 /post/게시글 idx로 이동
      .then((response) => {
        if (response.status === 200) {
          alert("수정에 성공했습니다.");
          navigate(`/post/${postIdx}`);
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
  }; //수정

  const authStore = AuthStore();
  const params = useParams();
  const postIdx = params.idx;

  //로그인 안되있으면 로그인 페이지 이동
  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    getPost();
  }, [authStore, navigate]);

  //창 크기에 따라 에디터 크기 변경
  useEffect(() => {
    refs.current.editor.getInstance().getMarkdown("");
    seteditorHeight(`${window.innerHeight - 200}px`); //창크기에 따라 editer크기변경
    window.addEventListener(
      "resize",
      () => seteditorHeight(`${window.innerHeight - 200}px`),
      []
    ); //창크기가 resize 될 때마다 editor 크기변경
  });

  //기존 게시물 가져와서 채워 넣기

  return (
    <CommonLayout>
      <WriteLayout>
        <Row>
          <Col>
            <Form.Control
              ref={(r) => (refs.current.title = r)} //타이틀 제목 가지고옴
              className="border-0 fs-1 mt-3"
              type="text"
              placeholder="제목을 입력하세요."
            />
          </Col>
        </Row>
        <Editor
          ref={(r) => (refs.current.editor = r)}
          previewStyle="vertical"
          initialEditType="markdown"
          height={editorHeight}
        />
        <Row className="fixed-bottom p-3 bg-white shadow-lg row">
          <Col className="col-auto">
            <Link to={-1}>
              <Image src={ExitImg} className="text-dark" />
              <span className="m-2">나가기</span>
            </Link>
          </Col>
          <Col className="col-auto">
            <Button
              variant="outline-success"
              type="button"
              onClick={updatePost}
            >
              수정하기
            </Button>
          </Col>
        </Row>
      </WriteLayout>
    </CommonLayout>
  );
};

export default UpdatePost;
