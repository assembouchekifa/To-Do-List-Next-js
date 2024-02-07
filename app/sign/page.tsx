"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri";
import { RingLoader } from "react-spinners";

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    if (!name) {
      setError("Enter name");
      return;
    }
    if (name.length < 5) {
      setError("name length must upper 5");
      return;
    }
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      setError("Enter valid email");
      return;
    }
    if (!password) {
      setError("Enter password");
      return;
    }
    if (password.length < 8) {
      setError("password length must upper 8");
      return;
    }
    if (password !== confirmPassword) {
      setError("Confirm password not correct");
      return;
    }
    setOnLogin(true);
    axios
      .post("https://todo-list-servar.onrender.com/auth/signin", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.data.name);
        setError("");
        setOnLogin(false);
        location.replace("/");
      })
      .catch((err) => {
        if (err.response.data.errors === "wrong password and email") {
          setError("Wrong password and email");
        } else if (
          err.response.data.message &&
          err.response.data.message.startsWith("E11000")
        ) {
          setError("This email is already in use");
        } else {
          setError("Unknown Error !!!");
        }
        setOnLogin(false);
      });
  }

  return (
    <form className="flex min-h-screen flex-col  justify-around items-center p-12 sm:p-24  bg-black">
      <h1 className="text-5xl">Sign in</h1>
      <div className="flex w-full relative flex-col text-2xl ">
        <label htmlFor="name">Name : </label>
        <input
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          className="bg-transparent flex-1 border-b-2 focus:outline-none"
          id="name"
        />
      </div>
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
        <label htmlFor="password">Password : </label>
        <input
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={passwordStat}
          className="bg-transparent flex-1  w-auto border-b-2 focus:outline-none"
          id="password"
        />
        {passwordStat == "password" ? (
          <RiEyeCloseFill
            className=" absolute top-1 right-0"
            onClick={hundelPasswordVea}
          />
        ) : (
          <RiEye2Fill
            className=" absolute top-1 right-0"
            onClick={hundelPasswordVea}
          />
        )}
      </div>
      <div className="flex w-full relative flex-col text-2xl ">
        <label htmlFor="confirmPassword">Confirm Password : </label>
        <input
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="text"
          className="bg-transparent flex-1 border-b-2 focus:outline-none"
          id="confirmPassword"
        />
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
      <Link className="text-xl" href={"/login"}>
        Return to the login page
      </Link>
    </form>
  );
}

export default Sign;
