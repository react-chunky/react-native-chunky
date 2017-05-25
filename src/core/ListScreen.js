import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicator,
  Button
} from 'react-native'
import { List, ListItem } from 'react-native-elements'
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

  reposDataOnChanged(old, data) {
    if (!data) {
      // Forget invalid data fetches
      return
    }
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(data)})
  }

  onItemPressed(data, section) {
    this.triggerTransition(this.detailsTransitionId(), { data })
  }

  renderDataItem(item, section) {
    return (<ListItem
        key={section}
        title={item.name}
        onPress={this.onItemPressed.bind(this, item, section)}
        leftIcon={{name: 'code'}}
      />)
  }

  renderData() {
    return (<List containerStyle={{marginTop: 0}}>
      <ListView
        renderRow={this.renderDataItem.bind(this)}
        dataSource={this.state.dataSource}
      />
    </List>)
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
