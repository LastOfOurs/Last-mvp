import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Keyboard } from 'react-native'
// import InputWithIcon from '../widgets/InputWithIcon'
import QRScanner from '../widgets/QRScanner'
import { colors, measures } from '../../common/styles'
var WalletUtils = require('../../common/utils/wallet.js')
var WalletsActions = require('../../common/actions/walletActions.js')
var GeneralActions = require('../../common/actions/generalActions')

export default class ImportWalletWithPKScreen extends React.Component {
  static navigationOptions = { title: 'Import Wallet' }
  state = { 
    pk: '',
    qrScanning: false,
  }

  handleTextChange = pk => {
    this.setState({ pk })
    if (this.state.qrScanning) {
      this.toggleQRScanning()
    }
}

  async handleLoadWallet() {  
    if (!this.state.pk) return
      Keyboard.dismiss()
      try {
          const wallet = WalletUtils.loadWalletFromPrivateKey(this.state.pk)
          const { walletName, walletDescription } = this.props.navigation.state.params
          await WalletsActions.addWallet(walletName, wallet, walletDescription)
          await WalletsActions.saveWallets()
          this.props.navigation.navigate('WalletsOverview')
          navigation.dismiss()
      } catch (e) {
          GeneralActions.notify(e.message, 'long')
      }
  }

    toggleQRScanning = () => {
      this.setState(prevState => ({ qrScanning: !prevState.qrScanning }))
    }
  
  render() {
    return (
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
              <Text style={styles.title}>Import with Private Key</Text>
              <TextInput style={styles.input} 
                autofocus={true}
                placeholder='eg.: 0xdbF14da8949D157B57acb79f6EEE62412b210900'
                value={this.state.pk}
                onChangeText={this.handleTextChange}
                />
          </View>
          <TouchableOpacity style={styles.button}
            onPress={() => this.toggleQRScanning()}>
              <Text>Scan QR</Text> 
          </TouchableOpacity>
          {this.state.qrScanning && <QRScanner
              ref='camera'
              onBarCodeRead={data => this.handleTextChange(data)} />}
          <TouchableOpacity style={styles.button}
            onPress={() => this.handleLoadWallet()}>
              <Text>Open Wallet</Text> 
          </TouchableOpacity>
        </View>
    )
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
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    margin: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    padding: 4,
    paddingLeft: 0,
    marginRight: 2,
    textAlign: 'center',
    color: colors.black
  }
})