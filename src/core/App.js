import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { Image } from 'react-native'
import { Styles } from 'react-chunky'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.init()
  }

  init() {
    var navigators = {}
    for(const sectionName in this.props.sections) {
      const section = this.props.sections[sectionName]
      const layout = section.layout || "default"
      var screens = {}

      section.chunks.forEach(chunkName => {
        const chunk = this.props.chunks[chunkName]

        for(const routeName in chunk.routes) {
          const route = chunk.routes[routeName]
          const screenProps = Object.assign({
            transitions: route.transitions,
            theme: this.props.theme
          }, route.props || {})
          const screen = (props) => <route.screen {...props} {...screenProps}/>
          const path = `${chunkName}/${routeName}`
          const navigationOptions = {
            title: route.title,
            header: {
              visible: !route.hideHeader,
              tintColor: Styles.styleColor(this.props.theme.tintColor || "#FFFFFF"),
              style: { backgroundColor:  Styles.styleColor(this.props.theme.navigationColor) },
            }
          }

          if (layout === 'tabs') {
            navigationOptions.tabBar = {
              label: route.title,
              icon: <Image source={chunk.assets.icon}/>
            }
          }

          if (route.hideBack) {
            navigationOptions.header.left = () => {}
          }

          screens[path] = { screen, navigationOptions}
        }
      })

      this._navigator = this._navigator || {}
      switch(layout) {
        case 'tabs':
          navigators = Object.assign({}, navigators, { [sectionName]: { screen: TabNavigator(screens) }})
          break
        case 'drawer':
          navigators = Object.assign({}, navigators, { [sectionName]: { screen: DrawerNavigator(screens) }})
          break;
        default:
          navigators = Object.assign({}, navigators, screens)
          break;
      }
    }

    this._navigator = StackNavigator(navigators)
  }

  get navigator() {
    return this._navigator
  }

  render() {
    const Content = this.navigator
    return <Content/>
  }
}
