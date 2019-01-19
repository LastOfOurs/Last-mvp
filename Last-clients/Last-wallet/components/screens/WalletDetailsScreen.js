import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import WalletBalance from '../widgets/WalletBalance'
import { LinearGradient } from 'expo'
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
      <LinearGradient colors={['#143C5A', '#0AAAD2', '#F7F7F7']} style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Send/Receive ETH or adopt animals</Text>
          <WalletBalance />
          <TouchableOpacity style={styles.button}
          onPress={this.handleSendPressed}>
            <Text style={styles.title}>Send ETH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleReceivePressed}>
            <Text style={styles.title}>Receive ETH</Text>
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
            <Text style={styles.title}>View Animals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={this.handleWalletSettingsPressed}>
            <Text style={styles.title}>Wallet Settings</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.footerImage} source={require('../../assets/penguin-moon.png')}/>
        </LinearGradient>
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
    color: 'white'
  },
  button: {
    padding: 7,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#143C5A'
  },
  footerImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
  },
})