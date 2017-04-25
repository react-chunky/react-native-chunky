import { StackNavigator, TabNavigator, DrawerNavigator, DrawerView } from 'react-navigation'
import React, { PureComponent } from 'react'
import { Image, Platform, Button, ScrollView } from 'react-native'
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

    // As soon as this App is instantiated, we want to generate the sections
    const sections = this._createSections()

    // Let's create the main app navigator
    const navigator = this._createAppNavigator(sections)

    // We're ready to keep track of our app sections and navigator
    this.state = { sections, navigator }
  }

  _createSectionNavigatorRoutes(element, section) {
    // We want to look at a stack element and figure out its parent chunk;
    // Note that chunks may also have flavours so this looks for the flavor, if any
    const [ chunkName, chunkFlavorName ] = element.split("/")

    // This is our chunk, if it actually exists
    const chunk = this.props.chunks[chunkName]

    if (!chunk) {
      // Let's verify that it actually points to a real chunk
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

    // These routes will be the ones we want to parse out of the chunk, as necessary
    var routes = {}

    for (let routeName in chunk.routes) {
      // Great, this chunk has routes, let's look through all of them
      var route = chunk.routes[routeName]

      // Let's build up the transitions, if any
      var transitions = {}

      if (chunk.transitions) {
        for (let transitionName in chunk.transitions) {
          var transition = chunk.transitions[transitionName]

          if (transition.route) {
            // This is a local transition, so let's resolve locally
            transitions[transitionName] = Object.assign({}, transition, { route: `${section.name}/${chunkName}/${transition.route}` })
            continue
          }

          // This looks like a valid global transition
          transition = this.props.transitions[transitionName]

          if (!transition) {
            // This transition is unknown
            continue
          }

          // Keep track of the global transition
          transitions[transitionName] = Object.assign({}, transition)
        }
      }

      // Let's pass over the theme as well
      const theme = this.props.theme

      // For each route, we want to compose its properties
      const screenProps = Object.assign({ theme, transitions }, route.props || {})

      // Now that we have properties, we're ready to initialize the route's screen
      const RouteScreen = route.screen
      const Screen = (props) => <RouteScreen {...props} {...screenProps}/>

      // // Before we keep track of the screen inside our navigator, we need some navigation options
      const navigationOptions = {
        title: route.title || "",
        header: {
          tintColor: Styles.styleColor(this.props.theme.navigationTintColor),
          style: { backgroundColor:  Styles.styleColor(this.props.theme.navigationColor) }
        }
      }

      // Good, so let's add this route to the navigator
      routes[`${section.name}/${chunkName}/${routeName}`] = { screen: Screen, navigationOptions }
    }

    // We've got ourselves some routes so we should be done with this
    return routes
  }

  _createSectionNavigator(section) {
    if (!section || !section.stack) {
      // We don't even considers stackless sections
      return
    }

    // These are the routes that we need to compile for this section's navigator
    var routes = {}

    // Let's look through the stack and build some routes for this section's navigator
    var elementIndex = 0
    section.stack.forEach(element => {
      var elementRoutes = {}

      if (element && typeof element === 'string') {
        // The first kind of element in the sack is a plain string, that signifies a chunk
        elementRoutes = Object.assign({}, elementRoutes, this._createSectionNavigatorRoutes(element, section))
      } else if (element &&  Array.isArray(element) && element.length > 0) {
        // Another type of element in the sack is a list of strings, that each signifies a chunk
        var composedRoutes = {}
        element.forEach(subElement => { composedRoutes = Object.assign({}, composedRoutes, this._createSectionNavigatorRoutes(subElement, section)) })
        elementRoutes = Object.assign({}, elementRoutes, composedRoutes)
      }

      // Compile a list of options for this section's navigator
      const navigatorConfig = {
        headerMode: (section.hideHeader ? 'none' : (Platform.OS === 'ios' ? 'float' : 'screen'))
      }

      routes[`${section.name}/${elementIndex}`] = { screen: StackNavigator(elementRoutes, navigatorConfig) }
      elementIndex = elementIndex + 1
    })

    if (section.layout === "drawer") {
      return DrawerNavigator(routes, {
        drawerWidth: 300,
        drawerPosition: 'left',
        contentOptions: {
          activeTintColor: Styles.styleColor(this.props.theme.navigationTintColor),
          inactiveTintColor: Styles.styleColor(this.props.theme.navigationTintColor),
          style: {
            marginVertical: 0,
            backgroundColor:  Styles.styleColor(this.props.theme.navigationColor)
          }
        },
        contentComponent: props => <ScrollView style={{ backgroundColor: Styles.styleColor(this.props.theme.navigationColor) }}><DrawerView.Items {...props} /></ScrollView>
      })
    }

    if (section.layout === "tabs") {
      return TabNavigator(routes, {
        headerMode: 'none',
        animationEnabled: false
      })
    }

    return StackNavigator(routes, {
      headerMode: 'none',
    })
  }

  _createSections() {
    // These are the sections we want to generate and initialize
    var sections = {}

    for(const sectionName in this.props.sections) {
      // Look through all the app's sections and for each, build defaults if necessary
      var section = this.props.sections[sectionName]
      section.name = sectionName
      section.layout = section.layout || "default"

      // Let's also generate a navigator for this section
      section.navigator = this._createSectionNavigator(section)

      if (!section.navigator) {
        // We want to skip sections without navigators
        continue
      }

      // Let's keep track of all the resolved sections
      sections[sectionName] = section
    }

    // And here are all our valid app sections
    return sections
  }

  _createAppNavigator(sections) {
    // We will use the section navigators to compose the main app navigator
    var subNavigators = {}

    for (let name in sections) {
      // We want to look through all the sections and pull out each section navigator
      const section = sections[name]
      subNavigators[name] = { screen: section.navigator }
    }

    // Let's put them all together into a headerless stack navigator
    return StackNavigator(subNavigators, { headerMode: 'none' })
  }

  render() {
    // The only element we need to render here is the main app navigator
    const AppNavigator = this.state.navigator
    return <AppNavigator/>
  }
}
