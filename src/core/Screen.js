import React from 'react'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  TextInput,
  ActivityIndicator,
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'
import { BlurView, VibrancyView } from 'react-native-blur'
import Spinner from 'react-native-loading-spinner-overlay'

export default class Screen extends Core.Screen {

  constructor(props) {
    super(props)
    this.state = { ...this.state, progress: true, progressTitle: this.progressTitle }
  }

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme),
      forms: DefaultStyles.forms(this.props.theme)
    }
  }

  componentDidMount() {
    super.componentDidMount()
    StatusBar.setBarStyle(`${this.props.theme.statusBarLight ? 'light' : 'dark'}-content`, false)
  }

  get progressTitle() {
    const min = 0
    const max = this.props.strings.progressTitle ? this.props.strings.progressTitle.length : 0
    const id = Math.floor(min + Math.random() * (max - min))
    return this.props.strings.progressTitle ? this.props.strings.progressTitle[id] : "Please wait"
  }

  get data() {
    return this.props.navigation.state.params || {}
  }

  pushTransition(transition, data) {
    this.props.navigation.navigate(transition.route, data)
  }

  hideStatusBar() {
    StatusBar.setHidden(true, false)
  }

  showStatusBar() {
    StatusBar.setHidden(false, false)
  }

  lightenStatusBar() {
    StatusBar.setBarStyle('light-content', false)
  }

  darkenStatusBar() {
    StatusBar.setBarStyle('dark-content', false)
  }

  renderProgressSpinner(title, visible) {
    return (<Spinner visible={ visible } overlayColor={this.props.theme.progressColor} textContent={ title } textStyle={{color: '#FFFFFF'}} />)
  }

  renderProgress() {
    return this.renderProgressSpinner(this.state.progressTitle, this.state.progress)
  }

  replaceTransition(transition, data) {
    this.props.navigation.navigate(transition.route, data)
  }

  goBack() {
    this.props.navigation.goBack()
  }

  renderData(data) {
    return ( <View style={this.styles.containers.main}>
    </View>)
  }

  renderDataDefaults() {
    return ( <View style={this.styles.containers.main}>
      <Card
        title={ this.props.strings.noData }
        titleStyle={this.styles.forms.header}
        style={this.styles.forms.container}>
        <Button
          style={this.styles.forms.secondaryButton}
          backgroundColor='#ffffff'
          color="#039BE5"
          onPress={this._onRetryRetrieveData}
          title={this.props.strings.retry}/>
      </Card>
    </View>)
  }

  renderDataLoading() {
    return this.renderData()
  }

  renderDataError({ main }) {
    return this.renderData()
  }
}
