import React from 'react'
import { View, Text, Image, StyleSheet, Button, StatusBar, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class WalletInitScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Last of Ours',
    }
  }

  handleCreateWallet = () => {
    console.log('wallet created')
    this.props.navigation.navigate("CreateWallet")
  }

  handleImportWallet = () => {
    console.log('wallet imported')
    this.props.navigation.navigate("ImportWallet")
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require('../../assets/last-logo.png')}/>
          <Text style={styles.title}>Wallet Init Screen</Text>
          <TouchableOpacity style={styles.button}
            onPress={this.handleCreateWallet}>
            <Text>Create New Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={this.handleImportWallet}>
            <Text>Import Existing Wallet</Text>
          </TouchableOpacity> 
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    margin: 5
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