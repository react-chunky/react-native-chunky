import React, { Component } from 'react'
import {
  StatusBar,
  View,
  Platform,
  StyleSheet,
  Navigator
} from 'react-native'
import { Styles } from 'react-chunky'
import { Errors } from '../..'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  renderRoute(route, props) {
    if (!route) {
      throw Errors.UNABLE_TO_LOAD_ROUTE("", "the route is unidentified")
    }

    if (!route.screen) {
      throw Errors.UNABLE_TO_LOAD_ROUTE("", "the route has no screen")
    }

    const Screen = route.screen
    const screenProps = Object.assign({
      transitions: route.transitions,
      theme: this.props.theme
    }, props || {}, route.props || {})

    return (<Screen {...screenProps} />)
  }

  configureScene(route, stack) {
    return Navigator.SceneConfigs[route && route.animation ? route.animation : "PushFromRight"]
  }

  renderScene(route, navigator) {
    return this.renderRoute(route, { navigator })
  }

  renderStatusBar() {
    return (<StatusBar barStyle={this.props.theme.statusBarType}/>)
  }

  renderNavigator() {
    return (<Navigator initialRoute={this.props.initialRoute}
                           ref="navigator"
                           configureScene={this.configureScene.bind(this)}
                           renderScene={this.renderScene.bind(this)}/>)
  }

  render() {
    return (
        <View style={this.styles.statusBar}>
          { this.renderStatusBar() }
          { this.renderNavigator() }
         </View>
    )
  }

  get styles() {
    return StyleSheet.create(
      Platform.select({
        ios: {
          statusBar: {
            flex: 1,
            backgroundColor: Styles.styleColor(this.props.theme.statusBarColor),
            paddingTop: 20
          }
        },
        android: {
          statusBar: {
            flex: 1,
            backgroundColor: Styles.styleColor(this.props.theme.statusBarColor),
            paddingTop: 0
          }
        }
      })
    )
  }

}
