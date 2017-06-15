import { renderApp } from '..'
import config from '../../../chunky.json'
import * as appChunks from '../../../chunks'
import strings from '../../../assets/strings.json'

config.chunks = appChunks
config.id = config.id || "chunky"
config.strings = strings

export default config
