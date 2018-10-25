import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import InputWithIcon from '../widgets/InputWithIcon'
// import Camera from '../widgets/Camera'
import PropTypes from 'prop-types'

export default class ImportWalletWithPKScreen extends React.Component {
  static navigationOptions = { title: 'Import with Private Key' }
  state = { pk: '' }

    async handleLoadWallet() {
        if (!this.state.pk) return
        Keyboard.dismiss()
        try {
            const wallet = WalletUtils.loadWalletFromPrivateKey(this.state.pk)
            const { walletName, walletDescription } = this.props.navigation.state.params
            await WalletsActions.addWallet(walletName, wallet, walletDescription)
            this.props.navigation.navigate('WalletsOverview', { replaceRoute: true })
            await WalletsActions.saveWallets()
        } catch (e) {
            GeneralActions.notify(e.message, 'long')
        }
    }
  
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>Private key</Text>
              <InputWithIcon
                  ref='input'
                  icon='qr-scanner'
                  placeholder='eg.: 0xdbF14da8949D157B57acb79f6EEE62412b210900'
                  onChangeText={pk => this.setState({ pk })}
                  onPressIcon={() => this.refs.camera.show()} />
          </View>
          <View style={styles.buttonsContainer}>
              <Button
                  // children='Open wallet'
                  title="open wallet"
                  onPress={() => this.onPressOpenWallet()} />
          </View>
          <Camera
              ref='camera'
              modal
              onClose={() => this.refs.camera.hide()}
              onBarCodeRead={data => this.refs.input.onChangeText(data)} />
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