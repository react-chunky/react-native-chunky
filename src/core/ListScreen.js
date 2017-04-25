import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native'
import * as Styles from '../styles'
import Screen from './Screen'

export default class ListScreen extends Screen {

  constructor(props) {
    super(props)
    this._onRetryPressed = this.onRetryPressed.bind(this)
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = { dataSource }
  }

  retrieveData() {

  }

  hasError() {
    return false
  }

  hasData() {
    return false
  }

  detailsTransitionId() {
    return 'details'
  }

  renderRow(data) {
    return (<View style={this.styles.containers.listRow}>
      <Text> List Row </Text>
    </View>)
  }

  onRetryPressed() {
    this.retrieveData()
  }

  componentDidMount() {
    this.retrieveData()
  }

  renderError(error) {
    return (<View style={this.styles.containers.main}>
      <Text> { error.message } </Text>
        <Button
          onPress={this._onRetryPressed}
          title="Retry"
        />
      </View>)
  }

  renderProgress() {
    return (<View style={this.styles.containers.main}>
      <ActivityIndicator
        animating={true}
        style={{height: 120}}
        size="small"/>
    </View>)
  }

  renderListRow(data) {
    return (
      <TouchableOpacity onPress={this.onRowPressed.bind(this, data)}>
        { this.renderRow (data) }
      </TouchableOpacity>)
  }

  renderRowSeparator(sectionId, rowId){
    return (<View key={rowId} style={this.styles.containers.listRowSeparator}/>)
  }

  reposDataOnChanged(old, data) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(data)})
  }

  onRowPressed(data) {
    this.props.navigation.navigate("DrawerOpen")
    // this.triggerTransition(this.detailsTransitionId(), { data })
  }

  renderData() {
    return (<View style={this.styles.containers.main}>
      <ListView style={this.styles.containers.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderListRow.bind(this)}
          renderSeparator={this.renderRowSeparator.bind(this)}/>
    </View>)
  }

  render() {
    if (this.hasError()) {
      return this.renderError()
    }

    if (this.hasData()) {
      return this.renderData()
    }

    return this.renderProgress()
  }
}
