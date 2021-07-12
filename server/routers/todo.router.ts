import Router from "koa-router";
import TodoModel from "../models/Todo";

import { Context } from "koa";

const router = new Router();
router.get("/", async (ctx: Context) => {
  const todos = await TodoModel.find().sort({ created_at: -1 }).lean();
  ctx.body = todos;
});
router.get("/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const todos = await TodoModel.findById({ _id: id }).lean();
  ctx.body = todos;
});
router.post("/", async (ctx: Context) => {
  const { title, content, check } = ctx.request.body as any;
  const newTodo = await TodoModel.create({
    title: title || "",
    content: content || "",
    check: check || false,
  });
  ctx.body = newTodo;
});
router.delete("/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const todo = await TodoModel.deleteOne({ _id: id });
  ctx.body = todo;
});
router.put("/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const { title, content, check } = ctx.request.body as any;
  const todo = await TodoModel.updateOne(
    { _id: id },
    {
      title: title || "",
      content: content || "",
      check: check || false,
    }
  );
  ctx.body = todo;
});
export default router;
