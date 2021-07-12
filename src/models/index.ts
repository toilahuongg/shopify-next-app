import axios from "axios";
import { cast, flow, types } from "mobx-state-tree";
import { ITodo } from "src/interface";
import DetailTodoModel from "./detailTodo";
import TodoModel from "./todo";

const RootStore = types
  .model({
    todoList: types.array(TodoModel),
    detailTodo: types.optional(DetailTodoModel, {}),
  })
  .actions((self) => ({
    getTodoList: flow(function* () {
      try {
        const res = yield axios.get("/api/todo");
        self.todoList = res.data;
      } catch (error) {
        console.log(error);
      }
    }),
    addTodo: (todo: ITodo) => {
      self.todoList = cast([todo, ...self.todoList]);
    },
    removeTodo: (id: string) => {
      self.todoList = cast(self.todoList.filter((todo) => todo._id !== id));
    },
    checkTodo: (id: string) => {
      const idx = self.todoList.findIndex((todo) => todo._id === id);
      self.todoList[idx].check = !self.todoList[idx].check;
    },
  }));
export default RootStore;
