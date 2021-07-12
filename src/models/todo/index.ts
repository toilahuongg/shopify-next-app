import { types } from "mobx-state-tree";

const TodoModel = types.model({
    _id: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    content: types.optional(types.string, ""),
    check: types.optional(types.boolean, false)
}).actions(self => ({
    setTitle(newTitle: string) {
        self.title = newTitle;
    }
})); 
export default TodoModel;