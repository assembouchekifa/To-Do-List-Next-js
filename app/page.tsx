"use client";

import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import st from "./page.module.css";
import classNames from "classnames";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

type todo = {
  don: boolean;
  text: string;
};

export default function Home() {
  const inpRef = useRef<HTMLInputElement>(null);
  const [inpValu, setInpValu] = useState("");
  const [todo, setTodo] = useState<todo[]>([]);

  function hundelAdd(): void {
    if (inpRef.current?.value) {
      let newtodo = { don: false, text: inpRef.current?.value };
      setTodo([...todo, newtodo]);
      localStorage.setItem("todo", JSON.stringify([...todo, newtodo]));
      setInpValu("");
    }
  }

  function hundelDon(i: number) {
    let newtodo: todo[] = [...todo];
    newtodo[i].don == false
      ? (newtodo[i].don = true)
      : (newtodo[i].don = false);
    setTodo(newtodo);
    localStorage.setItem("todo", JSON.stringify([...newtodo]));
  }

  function hundelDell(i: number): void {
    let newtodo: todo[] = [...todo];
    newtodo.splice(i, 1);
    setTodo(newtodo);
    localStorage.setItem("todo", JSON.stringify([...newtodo]));
  }
  useEffect(() => {
    let jsoneTodo = localStorage.getItem("todo");
    if (jsoneTodo) {
      let localtodo: todo[] = JSON.parse(jsoneTodo);
      setTodo([...localtodo]);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-12 sm:p-24">
      <h1 className="text-3xl text-center w-full mb-5  ">Todo List</h1>
      <h3 className="text-xl mb-3">Enter the task :</h3>
      <div className="flex w-full mb-7 justify-center ">
        <input
          className="focus:outline-none flex-1 bg-transparent border-b-2  "
          type="text"
          ref={inpRef}
          value={inpValu}
          onChange={(e) => {
            setInpValu(e.target.value);
          }}
        />
        <button className=" p-2 border-s-2 border-b-2 " onClick={hundelAdd}>
          <IoMdAdd />
        </button>
      </div>
      <div
        key={v4()}
        className="flex flex-col justify-start w-full items-start  "
      >
        {todo?.map((e, i) => {
          return (
            <div
              key={v4()}
              className="flex w-full justify-start items-start mb-5 "
            >
              <div
                style={e.don ? { textDecoration: "line-through" } : undefined}
                className={classNames(
                  "flex-1 p-2 border-s-2 border-t-2 border-b-2",
                  st.warp
                )}
                onClick={() => {
                  hundelDon(i);
                }}
              >
                {e.text}
              </div>
              <button
                className=" p-2 border-t-2 border-e-2 "
                onClick={() => {
                  hundelDell(i);
                }}
              >
                <MdDelete />
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
