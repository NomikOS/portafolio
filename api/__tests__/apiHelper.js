import { createServer } from "../infrastructure/lib/httpServer"
import { memoize } from "lodash"
import axios from "axios"
import { coreDb } from "@/infrastructure/lib/support"
import { configureContainer } from "@/infrastructure/lib/container"
const { env } = require("@/infrastructure/lib/env")

const container = configureContainer()

beforeAll(async () => {})

// API helper to make it easier to test endpoints.
export async function apiHelper(verb, path, data, headers) {
  const server = await startServer()
  const baseURL = `http://127.0.0.1:${server.address().port}`
  let h = {}

  const client = axios.create({
    baseURL,
    headers: {
      common: h,
    },
  })

  switch (verb) {
    case "get":
      return client.get(path, data).then((r) => r.data)
    case "post":
      return client.post(path, data).then((r) => r.data)
    case "delete":
      return client.delete(path, { params: data }).then((r) => r.data)
  }
}

const startServer = memoize(async () => {
  return (await createServer(container)).listen()
})

afterAll(async () => {
  // Server is memoized so it won't start a new one.
  // We need to close it.
  const server = await startServer()
  return new Promise((resolve) => server.close(resolve))
})
