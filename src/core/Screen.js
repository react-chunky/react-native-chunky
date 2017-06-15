import React from 'react'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'
import {
  AppRegistry,
  StyleSheet,
  Text,
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

import { FormLabel, FormInput, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'
import { BlurView, VibrancyView } from 'react-native-blur'

export default class Screen extends Core.Screen {

  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme),
      forms: DefaultStyles.forms(this.props.theme)
    }
  }

  inheritedData() {
    return this.props.navigation.state.params || {}
  }

  pushTransition(transition, data) {
    super.pushTransition(transition, data)
    this.props.navigation.navigate(transition, data)
  }

  renderData(data) {
    return ( <View style={this.styles.containers.main}>
      <Card
        title={ this.props.strings.success }
        titleStyle={this.styles.forms.header}
        style={this.styles.forms.container}>
        <Text style={this.styles.forms.prompt}> Got some data </Text>
        <Button
          style={this.styles.forms.secondaryButton}
          backgroundColor='#ffffff'
          color="#039BE5"
          onPress={this._onRetryRetrieveData}
          title={this.props.strings.reload}/>
      </Card>
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
    return (<View style={this.styles.containers.main}>
      <Card
        title={ this.props.strings.inProgress }
        titleStyle={this.styles.forms.header}
        style={this.styles.forms.container}>
        <ActivityIndicator
          animating={true}
          style={{height: 120}}
          size="small"/>
        <Button
          style={this.styles.forms.secondaryButton}
          backgroundColor='#ffffff'
          color="#039BE5"
          onPress={this._onCancelRetrieveData}
          title={ this.props.strings.cancel } />
      </Card>
    </View>)
  }

  renderDataError({ main }) {
    return (<View style={this.styles.containers.main}>
      <Card
        title={ this.props.strings.error }
        titleStyle={this.styles.forms.header}
        style={this.styles.forms.container}>
        <Text style={this.styles.forms.error}> { main.message } </Text>
        <Button
          style={this.styles.forms.secondaryButton}
          backgroundColor='#ffffff'
          color="#039BE5"
          onPress={this._onRetryRetrieveData}
          title={this.props.strings.retry}/>
      </Card>
    </View>)  
  }
}