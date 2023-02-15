import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
const AuthStore = () => {
  const [loginUser, setLoginUser] = useState(undefined);

  const setLoginUserByToken = (accessToken) => {
    try {
      const decodedAccessToken = jwtDecode(accessToken);
      setLoginUser(decodedAccessToken);
    } catch (error) {
      setLoginUser(null);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setLoginUserByToken(accessToken);
  }, []);

  useEffect(() => {
    //로그인유저가 바뀔때마다 실행
    if (loginUser === null) {
      localStorage.getItem("accessToken");
    }
  }, [loginUser]);

  return {
    loginUser,
    setLoginUser,
    setLoginUserByToken,
  };
};

export default AuthStore;
