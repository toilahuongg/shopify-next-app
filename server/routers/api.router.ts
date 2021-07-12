import Router from 'koa-router';
import todoRouter from './todo.router';
const router = new Router();

router.use('/todo', todoRouter.routes());
export default router;