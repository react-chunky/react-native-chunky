import React, { Component } from 'react'
import * as Errors          from '../errors'
import { UserContainer }    from 'react-chunky'

import {
  Platform,
  StyleSheet,
  Navigator,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  BackAndroid,
  StatusBar
} from 'react-native'


var retrieveUserHasError = false;

class App extends Component {

  constructor(props) {
    super(props)

    this.handleBackButton = this.handleBackButton.bind(this);
  }

  configureScene(route, stack) {
    return (this.props && this.props.config.navigatorConfig) || Navigator.SceneConfigs.PushFromRight;
  }

  componentDidMount() {
   if(this.props.splashScreen) {
     if(Platform.OS === this.props.splashScreen.platform) {
       this.props.splashScreen.splashObject.hide();
     }
   }
 }

  onAppSuccessfulAuthentication() {
    this.props.retrieveUser()
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    if (!route.screen) {
      throw Errors.UNABLE_TO_LOAD_ROUTE(route.path, "the route has no screen")
    }

    // Load the screen as defined by the route
    const Screen = route.screen
    const routeProps = route.props || {}
    const props = Object.assign({
      navigator,
      routePath: route.path,
      retrieveUserError: retrieveUserHasError,
      onAppSuccessfulAuthentication: this.onAppSuccessfulAuthentication.bind(this)
    }, routeProps, this.props);

    return (<Screen {...props} />)
  }

  handleBackButton() {
  if (Platform.OS === 'android') {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }
    return false;
  }
}

componentDidMount() {
  BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
  BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
}

  onRetryPressed(){
   this.props.retrieveUser();
 }


  renderContent() {
    if (this.props.hasUserError()) {
      retrieveUserHasError = true;
    }

    return (
        <View style={this.props.styles.Containers.STATUSBAR}>
          <StatusBar barStyle="light-content"/>
            <Navigator initialRoute={this.props.initialRoute}
                       ref="navigator"
                       configureScene={this.configureScene}
                       renderScene={this.renderScene.bind(this)}/>
         </View>
    )
  }

  render() {
    return (<View style={ styles.container }>
        {this.renderContent()}
      </View>)
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#333333",
    justifyContent: "center"
  },
  retry: {
    flexDirection: 'row',
    marginHorizontal: Platform.OS == 'ios' ? 15 : 30,
    marginTop: 15,
    backgroundColor: "#ff0000",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  error: {
    alignSelf: "center",
    color: "#ffffff",
    margin: 10
  },
  retryText: {
    color: "#ffffff"
  }
})

export default UserContainer(App)
