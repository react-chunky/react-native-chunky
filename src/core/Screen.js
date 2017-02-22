import React, { Component } from 'react'
import { View } from 'react-native'
import * as DefaultStyles from '../styles'

export default class Screen extends Component {

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

  didValueChange(name, nextProps) {
    return (nextProps[name]() != this.props[name]())
  }

  valueChanged(name, oldValue, newValue) {
    if (typeof oldValue === 'boolean') {
      const value = `${newValue}`.substring(0, 1).toUpperCase() + `${newValue}`.substring(1).toLowerCase()
      this[`${name}On${value}`] && this[`${name}On${value}`]()
    }

    this[`${name}OnChanged`] && this[`${name}OnChanged`](oldValue, newValue)
  }

  observeValue(name, nextProps) {
    if (!this.didValueChange(name, nextProps)) {
      return
    }

    const oldValue = this.props[name]()
    const newValue = nextProps[name]()

    this.valueChanged(name, oldValue, newValue)
  }

  observeValues(names, nextProps) {
    names.forEach(name => this.observeValue(name, nextProps))
  }
}
