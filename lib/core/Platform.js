import React from 'react'
import {
  AppRegistry,
  AsyncStorage
} from 'react-native'

const register = (name, component) => {
  AppRegistry.registerComponent(name, () => component)
}

export default {
  fetch: fetch,
  storage: AsyncStorage,
  register: register
}
