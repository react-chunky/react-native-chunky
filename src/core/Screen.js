import React from 'react'
import { View, Button } from 'react-native'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'

export default class Screen extends Core.Screen {

  constructor(props) {
    super(props)

    this.state = { triggered: false }
  }

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  triggerTransition (name, data) {
    if (this.state.triggered || !this.props.transitions || !this.props.transitions[name]) {
      // We already transitioned, or this is an unknown transition
      return
    }

    // This is the transition we're looking for
    const transition = this.props.transitions[name]

    if (!transition.route) {
      // This transition does not have a route, so forget about it
      return
    }

    if (transition.replace) {
      // We're replacing the previous route with this one
      this.setState({ triggered: true })
    }

    // Let's actually perform the transition to the new route
    this.props.navigation.navigate(transition.route, data)
  }
}
