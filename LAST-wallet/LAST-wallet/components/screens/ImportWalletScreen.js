import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class ImportWalletScreen extends React.Component {
  static navigationOptions = { title: 'Import Wallet' }
  
  handleLoadWithMnemonics = () => {
    this.props.navigation.navigate("ImportWithMnemonic")
    console.log('loading with mnemonics')
  }

  handleLoadWithPrivateKey = () => {
    this.props.navigation.navigate("ImportWithPK")
    console.log('loading with private key')
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Import Wallet Screen</Text>
          <TouchableOpacity style={styles.button}
            onPress={this.handleLoadWithPrivateKey}>
            <Text>Import using Private Key</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={this.handleLoadWithMnemonics}>
            <Text>Import using Mnemonics</Text>
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