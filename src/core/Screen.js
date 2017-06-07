import React from 'react'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'

export default class Screen extends Core.Screen {

 constructor(props) {
    super(props)
    this.state = { lastTransitionTimestamp: '' }
  }

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  replace(transition, data) {
    // TODO fix replace issue
    this.push(transition, data)
  }

  inheritedData() {
    return this.props.navigation.state.params || {}
  }

  push(transition, data) {
    const timeSinceLastTransition = Date.now() - this.state.lastTransitionTimestamp
    if (this.state.lastTransitionTimestamp && timeSinceLastTransition < 500) {
      // Ignore transition
      return
    }

    this.setState({ lastTransitionTimestamp: Date.now() })
    this.props.navigation.navigate(transition, data)
  }

}
