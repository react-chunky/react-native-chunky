import React, { Component } from 'react'
import {
  StatusBar,
  View,
  Platform,
  StyleSheet,
  Navigator
} from 'react-native'
import { styleColor, Screens, Errors, Chunks, Container } from '../..'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  configureScene(route, stack) {
    return Navigator.SceneConfigs[route && route.transition ? route.transition : "PushFromRight"]
  }

  renderScene(route, navigator) {
    if (!route) {
      throw Errors.UNABLE_TO_LOAD_ROUTE("", "the route is unidentified")
    }

    if (!route.screen) {
      throw Errors.UNABLE_TO_LOAD_ROUTE("", "the route has no screen")
    }

    const Screen = route.screen
    const props = Object.assign({
      navigator,
      transitions: route.transitions,
      theme: this.props.theme
    }, route.props || {})

    return (<Screen {...props} />)
  }

  get styles() {
    return StyleSheet.create({
      statusBar: {
        flex: 1,
        ...Platform.select({
          ios: {
            backgroundColor: styleColor(this.props.theme.statusBarColor),
            paddingTop: 20,
          },
          android: {
            backgroundColor: styleColor(this.props.theme.statusBarColor),
            paddingTop: 0,
          },
        })
      },
    })
  }

  render() {
    return (
        <View style={this.styles.statusBar}>
          <StatusBar barStyle={this.props.theme.statusBarType}/>
            <Navigator initialRoute={this.props.initialRoute}
                       ref="navigator"
                       configureScene={this.configureScene.bind(this)}
                       renderScene={this.renderScene.bind(this)}/>
         </View>
    )
  }
}
