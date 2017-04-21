import React from 'react'
import { View } from 'react-native'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'

export default class Screen extends Core.Screen {

  constructor(props) {
    super(props)

    console.log(props)
    this.state = { triggered: false }
  }

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  triggerTransition (name, data) {
    if (this.state.triggered || !this.props.transitions || !this.props.transitions[name]) {
      return
    }

    const transition = this.props.transitions[name]

    if (transition.replace) {
      this.setState({ triggered: true })
    }

    this.props.navigation.navigate(transition.id, data)
  }
}
