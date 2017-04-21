import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import { Styles } from 'react-chunky'

/**
 * The main React Native Chunky App instance is in charge of parsing the chunky.json
 * content and generating the app sections and navigators. This is the main entry point
 * for a Chunky mobile app. This class is not to be instantiated manually, but it is rather
 * invoked by the main Chunky AppContainer.
 * @extends {PureComponent}
 */
export default class App extends PureComponent {

  /**
   * This App constructor is not to be called manually, but it's injected by the Chunky AppContainer
   * @param {object} props the App gets its properties injected by the Chunky AppContainer
   */
  constructor(props) {
    super(props)

    // As soon as this App is instantiated, we want to initialize the sections
    this._initializeSections()
  }

  // createNavigationOptions(route, layout, assets) {
  //   var options = {
  //     title: route.title,
  //     header: {
  //       visible: !route.hideHeader,
  //       tintColor: Styles.styleColor(this.props.theme.tintColor || "#FFFFFF"),
  //       style: { backgroundColor:  Styles.styleColor(this.props.theme.navigationColor) },
  //     }
  //   }
  //
  //   if (route.hideBack) {
  //     options.header.left = () => {}
  //   }
  //
  //   if (layout === 'tabs') {
  //     options.tabBar = {
  //       label: route.title,
  //       icon: <Image source={assets.icon}/>
  //     }
  //   }
  //
  //   return options
  // }
  //
  // createScreenStack(screens) {
  //   return {
  //     screen: StackNavigator(screens),
  //     navigationOptions: {
  //       header: {
  //         style: { backgroundColor:  Styles.styleColor(this.props.theme.navigationColor) },
  //         left: () => {},
  //         style: { height: 0 }
  //       }
  //     }
  //   }
  // }
  //
  // createSectionChunk(sectionChunk) {
  //   let chunk, loadingRoutes, chunkName
  //
  //   if ( typeof sectionChunk === 'string' ) {
  //     chunkName = sectionChunk
  //     chunk = this.props.chunks[chunkName]
  //     loadingRoutes = chunk.routes
  //   } else if ( typeof sectionChunk === 'object' ) {
  //     chunkName = sectionChunk.chunk
  //     chunk = this.props.chunks[chunkName]
  //     loadingRoutes = {}
  //     sectionChunk.routes.forEach( item => {
  //       loadingRoutes[item] = item;
  //     })
  //   }
  // }

  _createSectionNavigatorRoute(route) {
    // console.log(route)
  }

  _createSectionNavigatorRoutes(element) {
    // We want to look at a stack element and figure out its parent chunk;
    // Note that chunks may also have flavours so this looks for the flavor, if any
    const [ chunkName, chunkFlavorName ] = element.split("/")

    if (!this.props.chunks[chunkName]) {
      // We've got a chunk name so let's verify that it actually points to a real chunk
      return
    }

    if (chunkFlavorName && (!chunk.flavors || !chunk.flavors[chunkFlavorName])) {
      // Great, let's check the flavor now
      return
    }

    // Great, so we've cleared the chunk and its flavor, if any, let's check the icon
    const iconName = `${chunkName}/${ chunkFlavorName ? chunkFlavorName : 'icon' }`

    if (!chunk.routes || chunk.routes.length === 0) {
      // One last thing, let's also make sure the chunk has routes
      return
    }

    // for (let routeName in chunk.routes) {
    //   var route = chunkRoutes[routeName]
    //   route.routeName = routeName
    //   // this.createSectionNavigatorRoute(route)
    // }

    // chunkRoutes.map(route => {
      // console.log(route)
    // })
    // return Object.assign({chunkName, iconName}, chunkFlavor ? { chunkFlavor } : {})
  }

  _createSectionNavigator(section) {
    // Have a look at the given section and parse the layout, stack and the name
    const layout = section.layout || "default"
    const stack = section.stack || []
    const sectionName = section.sectionName || "default"
    var routes = {}

    // Let's look through the stack and build some routes for this section's navigator
    stack.forEach(element => {
      if (element && typeof element === 'string') {
        // The first kind of element in the sack is a plain string, that signifies a chunk
        routes = Object.assign({}, routes, this._createSectionNavigatorRoutes(element))
        return
      }

      if (element &&  Array.isArray(element) && element.length > 0) {
        // Another type of element in the sack is a list of strings, that each signifies a chunk
        element.forEach(subElement => {
          routes = Object.assign({}, routes, this._createSectionNavigatorRoutes(subElement))
        })
        return
      }
    })

    console.log(sectionName, routes)
    // const navigator =
    // switch(layout) {
    //     case 'tabs':
    //       navigators = Object.assign({}, navigators, { [sectionName]: { screen: TabNavigator(screens) }})
    //       break
    //     case 'drawer':
    //       navigators = Object.assign({}, navigators, { [sectionName]: { screen: DrawerNavigator(screens) }})
    //       break;
    //     default:
    //       navigators = Object.assign({}, navigators, screens)
    //       break;
    //   }
    // return StackNavigator(routes)
  }

  _initializeSections() {
    for(const sectionName in this.props.sections) {
      // Look through all the app's sections and for each, build a navigator
      var section = this.props.sections[sectionName]
      section.sectionName = sectionName
      const navigator = this._createSectionNavigator(section)
    }
  }

  // init() {
  //   var navigators = {}
  //   for(const sectionName in this.props.sections) {
  //     const section = this.props.sections[sectionName]
  //     const layout = section.layout || "default"
  //     var screens = {}
  //     let chunk, loadingRoutes, chunkName
  //
  //     section.chunks.forEach( (sectionChunk, index) => {
  //
  //       if ( typeof sectionChunk === 'string' ) {
  //         chunkName = sectionChunk
  //         chunk = this.props.chunks[chunkName]
  //         loadingRoutes = chunk.routes
  //       } else if ( typeof sectionChunk === 'object' ) {
  //         chunkName = sectionChunk.chunk
  //         chunk = this.props.chunks[chunkName]
  //         loadingRoutes = {}
  //         sectionChunk.routes.forEach( item => {
  //           loadingRoutes[item] = item;
  //         })
  //       }
  //
  //       var chunkScreens = {}
  //
  //         for(const routeName in loadingRoutes) {
  //
  //           const route = chunk.routes[routeName]
  //           const screenProps = Object.assign({
  //             transitions: route.transitions,
  //             theme: this.props.theme
  //           }, route.props || {})
  //           var screen = (props) => <route.screen {...props} {...screenProps}/>
  //           const path = `${chunkName}/${routeName}`
  //
  //           const navigationOptions = this.createNavigationOptions(route, layout, chunk.assets)
  //
  //           if (layout === 'tabs') {
  //             chunkScreens[path] = { screen, navigationOptions }
  //           } else {
  //             screens[path] = { screen, navigationOptions}
  //           }
  //         }
  //
  //         if (Object.keys(chunkScreens).length > 0) {
  //           screens[`${index}_${chunkName}`] = this.createScreenStack(chunkScreens)
  //         }
  //     })
  //
  //     this._navigator = this._navigator || {}
  //     switch(layout) {
  //       case 'tabs':
  //         navigators = Object.assign({}, navigators, { [sectionName]: { screen: TabNavigator(screens) }})
  //         break
  //       case 'drawer':
  //         navigators = Object.assign({}, navigators, { [sectionName]: { screen: DrawerNavigator(screens) }})
  //         break;
  //       default:
  //         navigators = Object.assign({}, navigators, screens)
  //         break;
  //     }
  //   }
  //
  //   this._navigator = StackNavigator(navigators)
  // }

  get navigator() {
    return this._navigator
  }

  render() {
    const Content = this.navigator
    return <Content/>
  }
}
