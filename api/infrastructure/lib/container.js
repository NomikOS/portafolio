import {
  createContainer,
  Lifetime,
  InjectionMode,
  asValue,
  asClass,
} from "awilix"
import { coreDb } from "@/infrastructure/lib/support.js"
import { LoggerInstancer } from "@/infrastructure/lib/support"
import CoreRepositoryPostgres from "@/interfaces/storage/CoreRepositoryPostgres"

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  // Services should be scoped to the request.
  // This means that each request gets a separate instance
  // of a service.
  ["interfaces/controllers/*.js", Lifetime.SCOPED],
  ["application/use_cases/*.js", Lifetime.SCOPED],
]

/**
 * Configures a new container.
 * @return {Object} The container.
 */
export function configureContainer() {
  const opts = {
    injectionMode: InjectionMode.PROXY,
  }
  return createContainer(opts)
    .loadModules(modulesToLoad, {
      // modulesToLoad paths should be relative to this file's
      // parent directory.
      cwd: `${__dirname}/../..`,
      formatName: "camelCase",
    })
    .register({
      coreDb: asValue(coreDb),
      coreRepo: asClass(CoreRepositoryPostgres, {
        lifetime: Lifetime.SINGLETON,
      }),
      loggerRoot: asClass(LoggerInstancer, { lifetime: Lifetime.SINGLETON }),
      logger: asClass(LoggerInstancer, { lifetime: Lifetime.SCOPED }),
    })
}
