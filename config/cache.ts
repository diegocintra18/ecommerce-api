import env from '#start/env'
import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  /**
   * The store to use when none is specified
   */
  default: 'redis',

  /**
   * Default TTL for all cached entries.
   * Can be overridden per-store or per-operation.
   */
  ttl: '30s',

  /**
   * Configure one or more stores. Each store defines
   * its caching layers and driver settings.
   */
  stores: {
    /**
     * A Redis-backed store using the main Redis connection.
     */
    redis: store()
      .useL2Layer(drivers.redis({ connectionName: 'main' }))
      .useBus(drivers.redisBus({ connectionName: 'main' })),

    /**
     * A simple in-memory store for single-instance apps
     */
    memory: store()
      .useL1Layer(drivers.memory({ maxSize: '100mb' })),

    /**
     * A database-backed store using your Lucid connection
     */
    database: store()
      .useL2Layer(drivers.database({ connectionName: env.get('DB_CONNECTION') })),
  },
})

export default cacheConfig