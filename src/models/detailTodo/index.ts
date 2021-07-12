import axios from "axios";
import { flow, types } from "mobx-state-tree";

const DetailTodoModel = types.model({
    title: types.optional(types.string, ""),
    content: types.optional(types.string, ""),
    check: types.optional(types.boolean, false)
}).actions((self) => ({
    getTodo: flow(function * (id: string) {
        try {
            const res = yield axios.get(`/api/todo/${id}`);
            const {title,content,check} = res.data;
            self.title = title;
            self.content = content;
            self.check = check;
        } catch (error) {
            console.log(error)
        }   
    }),
    setTitle: (newTitle: string) => {
        self.title = newTitle;
    },
    setContent: (newContent: string) => {
        self.content = newContent;
    },
    toggleCheck: (check: boolean) => {
        self.check = check;
    }
}));
export default DetailTodoModel;