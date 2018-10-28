import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { colors } from '../../common/styles'
import PropTypes from 'prop-types'

export default class ImportWalletScreen extends React.Component {
  static navigationOptions = { title: 'Import Wallet' }
  state = {
    walletName: '',
    walletDescription: '',
  }
  
  handleLoadWithMnemonics = () => {
    const { walletName, walletDescription } = this.state
    if (walletName === '') {
      alert('please give your wallet a name')
      return
    }
    this.props.navigation.navigate("ImportWithMnemonic", { walletName, walletDescription })
  }

  handleLoadWithPrivateKey = () => {
    const { walletName, walletDescription } = this.state
    if (walletName === '') {
      alert('please give your wallet a name')
      return
    }
    console.log('loading with private key')
    this.props.navigation.navigate("ImportWithPK", { walletName, walletDescription })
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Import Wallet Screen</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.message}>Give your wallet a name!</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. daily transactions"
                underlineColorAndroid="transparent"
                onChangeText={walletName => this.setState({ walletName })} />
            <Text style={styles.message}>Give it a description too (optional)</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="e.g. groceries and all that"
                onChangeText={walletDescription => this.setState({ walletDescription })} />
          </View>
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 10,
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    padding: 4,
    paddingLeft: 0,
    marginRight: 2,
    textAlign: 'center',
    color: colors.black,
    margin: 8
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