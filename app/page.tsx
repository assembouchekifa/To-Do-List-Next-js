"use client";

import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import st from "./page.module.css";
import classNames from "classnames";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";

type todo = {
  don: boolean;
  text: string;
};

export default function Home() {
  const inpRef = useRef<HTMLInputElement>(null);
  const [inpValu, setInpValu] = useState("");
  const [todo, setTodo] = useState<todo[]>([]);
  const [loding, setLoging] = useState(false);
  const [name, setName] = useState("");

  function hundelAdd(): void {
    if (inpRef.current?.value) {
      const token = localStorage.getItem("token");
      let newtodo = { don: false, text: inpRef.current?.value };
      setLoging(true);
      axios
        .put(
          "https://todo-list-servar.onrender.com/todo",
          {
            todo: JSON.stringify([...todo, newtodo]),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setTodo([...todo, newtodo]);
          setLoging(false);
        })
        .catch((err) => {
          location.replace("/login");
        });
      setInpValu("");
    }
  }

  function hundelDon(i: number) {
    const token = localStorage.getItem("token");
    let newtodo: todo[] = [...todo];
    newtodo[i].don == false
      ? (newtodo[i].don = true)
      : (newtodo[i].don = false);
    setLoging(true);
    axios
      .put(
        "https://todo-list-servar.onrender.com/todo",
        {
          todo: JSON.stringify([...newtodo]),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setTodo(newtodo);
        setLoging(false);
      })
      .catch((err) => {
        location.replace("/login");
      });
  }

  function hundelDell(i: number): void {
    const token = localStorage.getItem("token");
    let newtodo: todo[] = [...todo];
    newtodo.splice(i, 1);
    setLoging(true);
    axios
      .put(
        "https://todo-list-servar.onrender.com/todo",
        {
          todo: JSON.stringify([...newtodo]),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setTodo(newtodo);
        setLoging(false);
      })
      .catch((err) => {
        location.replace("/login");
      });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      location.replace("/login");
      return;
    }
    setLoging(true);
    axios
      .get("https://todo-list-servar.onrender.com/todo", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTodo(JSON.parse(res.data.todo));
        setLoging(false);
      })
      .catch((err) => {
        location.replace("/login");
      });
    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, []);

  function hundelSingout() {
    localStorage.clear();
    location.replace("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-start relative justify-start p-12 sm:p-24 bg-black">
      <h1 className="text-3xl text-center w-full mb-5 text-white ">
        Todo List
      </h1>
      <div className="absolute top-2 left-2 text-lg "> name : {name}</div>
      <button
        onClick={hundelSingout}
        className="absolute px-3 py-2 border-2 top-2 right-2 rounded-md "
      >
        Sign out
      </button>
      <h3 className="text-xl text-white mb-3">Enter the task :</h3>
      <div className="flex w-full mb-7 justify-center ">
        <input
          className="focus:outline-none flex-1 text-white bg-transparent border-b-2  "
          type="text"
          ref={inpRef}
          value={inpValu}
          onChange={(e) => {
            setInpValu(e.target.value);
          }}
        />
        <button
          className=" p-2 border-s-2 text-white border-b-2 "
          onClick={hundelAdd}
        >
          <IoMdAdd />
        </button>
      </div>
      <div
        key={v4()}
        className="flex text-white flex-col justify-start items-center w-full   "
      >
        {loding ? (
          <ClimbingBoxLoader color="#fff" />
        ) : (
          todo?.map((e, i) => {
            return (
              <div
                key={v4()}
                className="flex text-white w-full justify-start items-start mb-5 "
              >
                <div
                  style={e.don ? { textDecoration: "line-through" } : undefined}
                  className={classNames(
                    "flex-1 text-white p-2 border-s-2 border-t-2 border-b-2",
                    st.warp
                  )}
                  onClick={() => {
                    hundelDon(i);
                  }}
                >
                  {e.text}
                </div>
                <button
                  className=" p-2 border-t-2 text-white border-e-2 "
                  onClick={() => {
                    hundelDell(i);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
