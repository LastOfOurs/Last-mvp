import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import WalletBalance from '../widgets/WalletBalance'
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

  handleMarketplacePressed = () => {
    this.props.navigation.navigate("Marketplace")
  }

  handleNFTWalletPressed = () => {
    this.props.navigation.navigate("NFTWallet")
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallet Details Screen</Text>
          <WalletBalance />
          <TouchableOpacity style={styles.button}
          onPress={this.handleSendPressed}>
            <Text style={styles.title}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleReceivePressed}>
            <Text style={styles.title}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleHistoryPressed}>
            <Text style={styles.title}>Wallet History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleMarketplacePressed}>
            <Text style={styles.title}>Marketplace</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleNFTWalletPressed}>
            <Text style={styles.title}>NFT Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleWalletSettingsPressed}>
            <Text style={styles.title}>Wallet Settings</Text>
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
    fontFamily: 'Poppins-SemiBold',
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