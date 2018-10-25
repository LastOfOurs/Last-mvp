import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { colors, measures } from '../../common/styles'
import PropTypes from 'prop-types'

export default class WalletDetailsScreen extends React.Component {
  static navigationOptions = { title: 'My Wallet' }
  state = {
    walletName: '',
    walletDescription: '',
  }
  
  handleProceedToMnemonics = () => {
    Keyboard.dismiss();
    const { walletName, walletDescription } = this.state;
    if (!walletName) {
      alert('please give your wallet a name')
      return
    }
    this.props.navigation.navigate("CreateWallet", { walletName, walletDescription })
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallet Naming Screen</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.message}>Give your new wallet a name!</Text>
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
          onPress={() => this.handleProceedToMnemonics()}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.defaultBackground,
    padding: measures.defaultPadding
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
  },
  message: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32,
    padding: 5
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
      justifyContent: 'center',
      alignItems: 'center'
    }
  })