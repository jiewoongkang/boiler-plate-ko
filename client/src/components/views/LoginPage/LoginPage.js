//import { response } from "express";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  //   const onPasswordHandler = (event) => {
  //     setPassword(event.currentTaget.value);
  //   };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  //   const onSubmitHandler = (event) => {
  //     const navigate = useNavigate();

  //     // 리플레쉬를 무조건 하는 것을 막는다.
  //     event.preventDefault();

  //     console.log("Email", Email);
  //     console.log("Password", Password);

  //     let body = {
  //       email: Email,
  //       password: Password,
  //     };

  //     dispatch(loginUser(body)).then((response) => {
  //       if (response.payload.loginSuccess) {
  //         console.group("dispatch", response);
  //         //props.history.push("/");
  //         //navigate("/http://localhost:3000/");
  //         //push("/");
  //       } else {
  //         alert("Error˝");
  //       }
  //     });
  //   };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        //props.history.push("/");
        navigate("/");
      } else {
        alert("Error˝");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
//export default withRouter(LandingPage);
