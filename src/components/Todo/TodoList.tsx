import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataTable, Checkbox, Button, Spinner } from "@shopify/polaris";
import { observer } from "mobx-react";
import axios from "axios";
import { ITodo } from "src/interface";
import style from "./style.module.scss";
import ModalRemove from "./ModalRemove";
import RootContext from "src/context/RootContext";
const TodoList = observer(() => {
  const store = useContext(RootContext);
  const [loadingTodoList, setLoadingTodoList] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingActionRemove, setLoadingActionRemove] = useState<boolean>(false);
  const [loadTodos, setLoadTodos] = useState<boolean[]>([]);
  const [removeId, setRemoveId] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setLoadingTodoList(true);
        await store.getTodoList();
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTodoList(false);
      }
    })();
  }, []);

  const toggleOpen = () => setOpen(!open);

  const handleRemove = async () => {
    try {
      setLoadingActionRemove(true);
      await axios.delete(`/api/todo/${removeId}`);
      store.removeTodo(removeId);
      setOpen(false);
      setRemoveId("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActionRemove(false);
    }
  };

  const handleChangeCheck = async (newChecked: boolean, todo: ITodo) => {
    try {
      store.checkTodo(todo._id);
      const data = {
        title: todo.title,
        content: todo.content,
        check: newChecked,
      };
      const response = await axios.put(`/api/todo/${todo._id}`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickRemove = (id: string) => {
    setRemoveId(id);
    setOpen(true);
  };

  const handleClickClone = async (todo: ITodo) => {
    try {
      let arrLoading = [...loadTodos];
      arrLoading[todo._id] = true;
      setLoadTodos(arrLoading);
      const data = {
        title: todo.title+" (Sao chép)",
        content: todo.content,
        check: todo.check,
      };
      const response = await axios.post("/api/todo", data);
      console.log(response.data);

      const newTodo: ITodo = {
        _id: response.data._id,
        title: response.data.title,
        content: response.data.content,
        check: response.data.check,
      };
      store.addTodo(newTodo);
    } catch (error) {
      console.log(error);
    } finally {
      let arrLoading = [...loadTodos];
      arrLoading[todo._id] = false;
      setLoadTodos(arrLoading);
    }
  };

  const rows = store.todoList.map((todo) => [
    todo.title,
    todo.content,
    <Checkbox
      label=""
      checked={todo.check}
      onChange={(newChecked) => handleChangeCheck(newChecked, todo)}
    />,
    <div className={style.buttonGroup}>
      <Button
        onClick={() => {
          handleClickClone(todo);
        }}
        size="slim"
        loading={loadTodos[todo._id]}
      >
        Clone
      </Button>
      <Link href={"/todo/" + todo._id}>
        <span>
          <Button size="slim" outline>
            Edit
          </Button>
        </span>
      </Link>
      <Button
        onClick={() => handleClickRemove(todo._id)}
        destructive
        size="slim"
        outline
      >
        Delete
      </Button>
    </div>,
  ]);

  if (loadingTodoList)
    return (
      <DataTable
        columnContentTypes={["text", "numeric", "numeric", "numeric"]}
        headings={["Id", "Content", "Check", "Action"]}
        rows={[
          [
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner accessibilityLabel="Spinner example" size="small" />
            </div>,
          ],
        ]}
        hoverable
      />
    );
  return (
    <>
      <DataTable
        columnContentTypes={["text", "numeric", "numeric", "numeric"]}
        headings={["Title", "Content", "Check", "Action"]}
        rows={rows}
        hoverable
        totals={["", "", "", store.todoList.length]}
      />
      <ModalRemove
        loading={loadingActionRemove}
        action={handleRemove}
        open={open}
        toggleOpen={toggleOpen}
      />
    </>
  );
});
export default TodoList;
