import axios from "axios";
import { flow, types } from "mobx-state-tree";
import { createContext } from "react";
const DetailTodoStore = types
  .model({
    title: types.string,
    content: types.string,
    check: types.boolean,
    loadTodo: types.boolean,
    loading: types.boolean,
    open: types.boolean,
    id: types.string,
  })
  .actions((self) => ({
    setId(value: string) {
      self.id = value;
    },
    setOpen(value: boolean) {
      self.open = value;
    },
    setLoading(value: boolean) {
      self.loading = value;
    },
    getTodo: flow(function* (id: string) {
      try {
        self.loading = true;
        const response = yield axios.get(`/api/todo/${id}`);
        const { title, content, check } = response.data;
        self.title = title;
        self.content = content;
        self.check = check;
        self.loadTodo = true;
      } catch (error) {
        console.log(error);
        self.loadTodo = false;
      } finally {
        self.loading = false;
      }
    }),
    setTitle(newTitle: string) {
      self.title = newTitle;
    },
    setContent(newContent: string) {
      self.content = newContent;
    },
    toggleCheck(check: boolean) {
      self.check = check;
    },
  }));
export const detailTodoStore = DetailTodoStore.create({
  title: "",
  content: "",
  check: false,
  loadTodo: false,
  loading: false,
  open: false,
  id: "",
});
export const DetailTodoContext = createContext(detailTodoStore);
export default DetailTodoStore;
