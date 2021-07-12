import { createServer } from '@/infrastructure/lib/httpServer'
import { configureContainer } from '@/infrastructure/lib/container'
import { env } from '@/infrastructure/lib/env'
const {
  coreDb,
  unhandledRejectionHandler,
  signalsHandlers
} = require('@/infrastructure/lib/support')
const container = configureContainer()
const loggerRoot = container.resolve('loggerRoot')

unhandledRejectionHandler(container)

// Server http
createServer(container)
  .then((server) => {
    server.listen(env.PORT, () => {
      loggerRoot.debug(
        `[x] HTTP server listening on ${env.PORT} in ${env.NODE_ENV} mode.`
      )
    })

    let stopping = false
    // En cloudrun do a warm to maintain service alive
    process.on('SIGTERM', async () => {
      loggerRoot.debug(
        `Received SIGTERM, Execute warming (stopping:${stopping})`
      )
      if (stopping) return
      stopping = true
      try {
        await signalsHandlers.warmit(loggerRoot, env)
      } catch (error) {
        loggerRoot.debug(error?.message || error)
        await signalsHandlers.stopit(loggerRoot, server, coreDb)
      }
    })
    // En vm con pm2 do a graceful shutdown
    process.on('SIGINT', async () => {
      if (stopping) return
      stopping = true
      loggerRoot.debug(
        `Received SIGINT, Execute graceful shutdown (stopping:${stopping})`
      )
      await signalsHandlers.stopit(loggerRoot, server, coreDb)
    })
  })
  .catch((err) => {
    loggerRoot.debug('Error while starting up server', err)
    process.exit(1)
  })
