import { Driver, Session, auth, driver as createDriver } from 'neo4j-driver'
import config from '../config/config.js';

export const neo4jDriver: Driver = createDriver(
    config.neonUri,
    auth.basic(config.neonUser, config.neonPassword)
  )