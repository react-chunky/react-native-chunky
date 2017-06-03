import React from 'react'
import { View, Button } from 'react-native'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'

export default class Screen extends Core.Screen {

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  get auth() {
    return this.props.navigation.state.params.auth
  }

  get data() {
    return this.props.navigation.state.params
  }

  get prettyChunkName() {
    return this.props.chunkName.charAt(0).toUpperCase() + this.props.chunkName.substring(1)
  }

  retrieveData() {
    return this.props[`retrieve${this.prettyChunkName}`]()
  }

  hasError() {
    return this.props[`${this.props.chunkName}HasError`]()
  }

  hasData() {
    return this.props[`${this.props.chunkName}HasData`]()
  }

  getData() {
    return this.props[`${this.props.chunkName}Data`]() 
  }

  getError() {
    return this.props[`${this.props.chunkName}Error`]() 
  }

  replace(transition, data) {
    this.props.navigation.navigate(transition, Object.assign({ replace: true}, data))
  }

  push(transition, data) {
    this.props.navigation.navigate(transition, data)
  }
}
