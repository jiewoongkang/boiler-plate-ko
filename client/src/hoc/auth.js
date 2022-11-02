import { Axios } from "axios";
//import { response } from "express";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null) {
  // null 아무나 출입이 가능
  // true 로그인한 유저만 출입 가능
  // false 로그인한 유저만 출입 불가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      //Axios.get('/api/users/auth')
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않는 상태
        if (!response.payload.isAuth) {
          if (option) {
            // 옵션이 로그인 한 사람만 들어 오라고 했으니 login으로 보낸다.
            navigate("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.isAuth) {
            console.log(
              "login 체크",
              "로그인 상태인데 서버에서 관리자 가 아니라고 리턴한 경우"
            );
            navigate("/");
          } else {
            // 로그인 유저가 출입 불가능한 페이지를 접속하려고 하면
            console.log(
              "login 체크",
              "로그인 상태인데 옵션이 false 된경우, 로그인한 유저는 못들어가는 페이지 "
            );
            navigate("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
