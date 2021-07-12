import { createController } from "awilix-koa"
const { authMiddleware } = require("@/infrastructure/lib/support")

const api = ({ apiController }) => ({
  get: async (ctx) => {
    ctx.ok(await apiController.get(ctx.params.case, ctx.query))
  },
  post: async (ctx) =>
    ctx.ok(await apiController.post(ctx.params.case, ctx.request.body)),
  delete: async (ctx) =>
    ctx.ok(await apiController.delete(ctx.params.case, ctx.query)),
})

export default createController(api)
  .get("/:case", "get")
  .post("/:case", "post")
  .delete("/:case", "delete")
