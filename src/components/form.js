import React, { Component } from 'react'
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
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native'
import { FormLabel, FormInput, Avatar, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'
import Screen from '../core/Screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let window = Dimensions.get('window'),
  screen = Dimensions.get('window'),
  smallScreen  = screen.height < 500

export default class FormScreen extends Screen {

  constructor(props) {
    super(props)

    this._onContinuePressed = this.onContinuePressed.bind(this)
    this._onQuestionPressed = this.onQuestionPressed.bind(this)
    this._onImageFieldPressed = (name) => this.onImageFieldPressed.bind(this)

    this._onFieldChanged = (name, options) => this.onFieldChanged.bind(this, name, options)

    this.state = { ...this.state, fields: {}, error: "", progress: false, extended: true, animationOffset: new Animated.Value(0) }
  }

  componentWillMount() {
    super.componentWillMount()
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }

  onFieldChanged(name, options, value) {
    var fields = Object.assign({}, this.state.fields)
    fields[name] = value
    this.setState({ fields,  error: '' })
  }

  validate() {}
  submit(data) {}

  onQuestionPressed() {}

  onError(error) {
    this.setState({ progress: false, error: error.message })
  }

  isFormValid() {
    // Start by dismissing the keyboard
    Keyboard.dismiss()

    // Check for validation errors
    const error = this.validate()

    if (error) {
        // The form is invalid
        this.setState({ progress: false, error })
        return false
    }

    // Looks like the form is valid
    this.setState({ progress: true, error: "" })
    return true
  }

  onContinuePressed() {
    // Check if the form is valid
    if (!this.isFormValid()) {
      return
    }

    // Perform the success action
    this.submit(this.state.fields)
  }

  keyboardWillShow(e) {
    this.hideStatusBar()
    const keyboardHeight = e.endCoordinates.height

    Animated.timing(this.state.animationOffset, {
      duration: 300,
      toValue: -keyboardHeight
    }).start()
  }

  keyboardWillHide() {
    this.showStatusBar()
    Animated.timing(this.state.animationOffset, {
      duration: 300,
      toValue: 0
    }).start()
  }

  renderError() {
    if (!this.state.error) {
      return (<View/>)
    }

    return (<Text style={this.styles.formError}>
          { this.state.error }
      </Text>)
  }

  get styles () {
    return Object.assign(super.styles, styles(this.props))
  }

  renderDataError() {
    return this.renderData()
  }

  renderDataDefaults() {
    return this.renderData()
  }

  renderDataLoading() {
    return this.renderProgress()
  }

  renderData() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={this.styles.container}>
        { this.renderContent() }
      </ScrollView>)
  }

  keyboardType(type) {
    switch (type) {
      case "email":
        return "email-address"
      case "phone":
        return "phone-pad"
      default:
        return "default"
    }
  }

  imageFieldData(name) {
    return {
      icon: {name: 'account-circle'}
    }
  }

  renderImageField(name, options) {
    const data = this.imageFieldData(name)

    return (<View key={`${name}Field`} style={{flexDirection: "column", height: 120, alignItems: "center", justifyContent: "center"}}>
        <Avatar
          style={{height: 75, width: 75 }}
          large
          rounded
          overlayContainerStyle={{ backgroundColor: this.props.theme.primaryColor }}
          { ...this.imageFieldData(name) }
          onPress={this.selectedImageField.bind(this, name, options)}
        />
        <Button
            buttonStyle={ this.styles.formSecondaryButton }
            backgroundColor='#ffffff'
            color={ this.props.theme.primaryColor }
            onPress={ this._onImageFieldPressed(name) }
            title={ this.props.strings.changePhoto }/>
        </View>)
  }

  onImageFieldPressed(name) {}

  selectedImageField(name) {}

  defaultFieldValue(name) {
    return
  }

  renderField(name, options) {
      if (options.type === 'image') {
        return this.renderImageField(name, options)
      }

      return (<FormInput
            key={`${name}Field`}
            defaultValue={this.defaultFieldValue(name)}
            placeholder={ this.props.strings[`${name}Placeholder`] }
            onChangeText={this._onFieldChanged(name, options)}
            secureTextEntry={ options.secure }
            autoCorrect={ false }
            placeholderTextColor= { "#BDBDBD" }
            autoCapitalize={ "none" }
            blurOnSubmit={ true }
            keyboardType={ this.keyboardType(options.type) }
            style={this.styles.formTextField}/>)
  }

  renderFields() {
    if (!this.props.fields || Object.keys(this.props.fields).length === 0) {
      return <View/>
    }
    var fields = []
    for (const field in this.props.fields) {
      if (this.state.extended || !this.props.fields[field].extended) {
        fields.push(this.renderField(field, this.props.fields[field]))
      }
    }
    return fields
  }


  renderLogo() {
    return  (<View/>)
  }

  renderSubmitButton() {
    return (<Button
        buttonStyle={this.styles.formButton}
        backgroundColor={this.props.theme.primaryColor}
        color='#ffffff'
        onPress={this._onContinuePressed}
        icon={{name: 'user-circle-o', type: 'font-awesome'}}
        title={ this.props.strings.action }/>)
  }

  showError(error) {
    this.setState({ error: error.message })
  }

  renderQuestionButton() {
    return (<Button
        buttonStyle={this.styles.formSecondaryButton}
        backgroundColor='#ffffff'
        color={this.props.theme.primaryColor}
        onPress={this._onQuestionPressed}
        title={ this.props.strings.question }/>)
  }

  renderFormHeader() {
    return (<Text style={this.styles.formHeader}>
      { this.props.strings.header }
    </Text>)
  }

  renderContent() {
      return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[this.styles.container, {
              flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }]}>
              <KeyboardAwareScrollView>
                { this.renderLogo() }
                { this.renderFormHeader() }
                <View style={[this.styles.formContainer]}>
                  { this.renderError() }
                  { this.renderFields() }
                  { this.renderSubmitButton() }
                  { this.renderQuestionButton() }
                </View>
                </KeyboardAwareScrollView>
            </View>
          </TouchableWithoutFeedback>)
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.dark ? '#37474F' : props.theme.backgroundColor
  },
  formHeader: {
    padding: 10,
    color: props.theme.primaryColor,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    margin: 20,
    elevation: 3,
    borderRadius: 4,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  formError: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    color: '#f44336'
  },
  formTextField: {
    height: 60,
    width: 250,
    alignSelf: "center",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  formButton: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 40,
    marginBottom: 20
  },
  formSecondaryButton: {
    margin: 10
  }
})
