import { renderApp } from '..'
import appConfig from '../../../chunky.json'
import * as appChunks from '../../../chunks'

appConfig.chunks = appChunks
appConfig.id = "chunky"
appConfig.platform = "android"

renderApp(appConfig)
