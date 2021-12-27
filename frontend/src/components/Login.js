import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("m.jouza3@gmail.com");
  const [password, setPassword] = useState("1234");

  const loginFunc = (e) => {
    e.preventDefault()
    const userInfo = {
      // "email":email
      email,
      password,
    };
    axios
      .post(`http://localhost:5000/users/login`, userInfo)
      .then((response) => {
        console.log("DATA: ", response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  return (
    <div className="Login">
      <form action="">
        <label htmlFor="">Email:</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="text"
          placeholder="Write email here ..."
        />
        <br />
        <label htmlFor="">Password:</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="Write password here ..."
        />
        <br />
        <input type="submit" value="Login" onClick={loginFunc} />
      </form>
    </div>
  );
}
