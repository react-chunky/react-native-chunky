import { renderApp } from '..'
import config from '../../../chunky.json'
import * as appChunks from '../../../chunks'

config.chunks = appChunks
config.id = config.id || "chunky"

export default config
