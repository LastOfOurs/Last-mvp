import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native'
import InputWithIcon from '../widgets/InputWithIcon'
import QRScanner from '../widgets/ExpoCamera'
import { colors, measures } from '../../common/styles'
// import Camera from '../widgets/Camera'
import PropTypes from 'prop-types'

export default class ImportWalletWithPKScreen extends React.Component {
  static navigationOptions = { title: 'Import Wallet' }
  state = { 
    pk: '',
    qrScanning: false,
  }

  handleTextChange = pk => {
    this.setState({ pk })
}

  async handleLoadWallet() {
      if (!this.state.pk) return
      Keyboard.dismiss()
      try {
          const wallet = WalletUtils.loadWalletFromPrivateKey(this.state.pk)
          // const { walletName, walletDescription } = this.props.navigation.state.params
          await WalletsActions.addWallet(walletName, wallet, walletDescription)
          this.props.navigation.navigate('WalletsOverview', { replaceRoute: true })
          await WalletsActions.saveWallets()
      } catch (e) {
          GeneralActions.notify(e.message, 'long')
      }
  }

    toggleQRScanning = () => {
      this.setState(prevState => ({ qrScanning: !prevState.qrScanning }))
      console.log('qrScanning: ' + this.state.qrScanning)
    }
  
  render() {
    return (
        <View style={styles.mainContainer}>
          <View style={styles.body}>
              <Text style={styles.title}>Import with Private Key</Text>
              <TextInput style={styles.input} 
                ref='input'
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
              modal
              onBarCodeScanned={data => this.handleTextChange(data)} />}
          <TouchableOpacity style={styles.button}
            onPress={() => this.handleLoadWallet}>
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
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    margin: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center'
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