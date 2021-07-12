import { createContext } from "react";
import TodoStore from "../stores/todo/TodoStore";

const todoStore = TodoStore.create({
    todos: [],
    loading: true
});
const TodoContext = createContext(todoStore);
export default TodoContext;