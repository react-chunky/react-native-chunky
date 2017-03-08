import React from 'react'
import { View } from 'react-native'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'

export default class Screen extends Core.Screen {

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  triggerTransition (name) {
    if (!this.props.transitions || !this.props.transitions[name]) {
      return
    }

    const transition = this.props.transitions[name]

    if (!transition.type) {
      return
    }

    this.props.navigator[transition.type](transition.route, transition.animation || "PushFromRight")
  }
}
