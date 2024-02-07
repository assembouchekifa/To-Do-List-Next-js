"use client";
import axios from "axios";
import React, { useState } from "react";
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri";
import { RingLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStat, setPasswordStat] = useState("password");
  const [onLogin, setOnLogin] = useState(false);
  const [error, setError] = useState("");

  function hundelPasswordVea() {
    if (passwordStat == "password") {
      setPasswordStat("text");
    } else {
      setPasswordStat("password");
    }
  }

  function hundelSubmi() {
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      setError("Enter valid email");
      return;
    }
    if (!password) {
      setError("Enter password");
      return;
    }
    setOnLogin(true);
    axios
      .post("https://todo-list-servar.onrender.com/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setError("");
        setOnLogin(false);
      })
      .catch((err) => {
        if (err.response.data.errors == "wrong password and email") {
          setError("Wrong password and email");
        } else {
          setError("Unknown Error !!!");
        }
        setOnLogin(false);
      });
  }

  return (
    <form className="flex min-h-screen flex-col  justify-around items-center p-12 sm:p-24  bg-black">
      <h1 className="text-5xl">Login</h1>
      <div className="flex w-full relative flex-col text-2xl ">
        <label htmlFor="email">Email : </label>
        <input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="bg-transparent flex-1 border-b-2 focus:outline-none"
          id="email"
        />
      </div>
      <div className="flex w-full relative flex-col text-2xl ">
        <label htmlFor="password">Pass Word : </label>
        <div className="flex w-full items-center ">
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={passwordStat}
            className="bg-transparent flex-1 border-b-2 focus:outline-none"
            id="password"
          />
          {passwordStat == "password" ? (
            <RiEyeCloseFill onClick={hundelPasswordVea} />
          ) : (
            <RiEye2Fill onClick={hundelPasswordVea} />
          )}
        </div>
      </div>
      <div className="text-xl text-red-800">{error}</div>
      <div className=" w-full flex justify-center items-center h-16 ">
        {onLogin ? (
          <RingLoader color="#fff" />
        ) : (
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              hundelSubmi();
            }}
            value={"submit"}
            className=" border-2 px-3 py-2 rounded-lg text-2xl "
          />
        )}
      </div>
    </form>
  );
}

// assemt@ggr.ce
// Assem1010114101011101000110101110101

export default Login;
