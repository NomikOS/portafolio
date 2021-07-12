import { env } from "@/infrastructure/lib/env"
export const coreDb = require("knex")(env.knexPg)

export const { LoggerInstancer } = require("@nomikos/module-koa-common")
export const { NotFoundError } = require("@nomikos/module-koa-common")
export const { ValidationError } = require("@nomikos/module-koa-common")
export const { Assertion } = require("@nomikos/module-koa-common")
export const { UnauthorizedError } = require("@nomikos/module-koa-common")
export const { authMiddleware } = require("@nomikos/module-koa-common")
export const { loggerMiddleware } = require("@nomikos/module-koa-common")
export const {
  unhandledRejectionHandler,
} = require("@nomikos/module-koa-common")
export const { errorHandlerMiddleware } = require("@nomikos/module-koa-common")
export const {
  notFoundHandlerMiddleware,
} = require("@nomikos/module-koa-common")
export const { registerContextSimple } = require("@nomikos/module-koa-common")
export const { VerboseError } = require("@nomikos/module-koa-common")
export const { signalsHandlers } = require("@nomikos/module-koa-common")
