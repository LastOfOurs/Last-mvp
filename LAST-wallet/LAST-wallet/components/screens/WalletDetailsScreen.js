import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class WalletDetailsScreen extends React.Component {
  static navigationOptions = { title: 'My Wallet' }
  handleWalletSettingsPressed = () => {
    this.props.navigation.navigate("WalletSettings")
  }

  handleSendPressed = () => {
    this.props.navigation.navigate("SendTransaction")
  }

  handleReceivePressed = () => {
    this.props.navigation.navigate("ReceiveTransaction")
  }

  handleHistoryPressed = () => {
    this.props.navigation.navigate("WalletHistory")
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallet Details Screen</Text>
          <TouchableOpacity style={styles.button}
          onPress={this.handleSendPressed}>
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleReceivePressed}>
            <Text>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleHistoryPressed}>>
            <Text>Wallet History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleWalletSettingsPressed}>>
            <Text>Wallet Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    margin: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center'
  }
})