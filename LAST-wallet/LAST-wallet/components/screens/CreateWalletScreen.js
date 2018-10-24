import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Wallet as WalletUtils } from '../../common/utils/wallet'
import PropTypes from 'prop-types'

export default class CreateWalletScreen extends React.Component {
  static navigationOptions = { title: 'Create Wallet' }
  state = {
    mnemonics: null,
  }

  handleMnemonicReveal() {
    console.log('sup')
    console.log(WalletUtils)
    const mnemonics = WalletUtils.generateMnemonics()
    this.setState({ mnemonics })
  }

  renderMnemonic = (mnemonic, index) => (
        <View style={styles.mnemonic} key={index}>
            <Text>{mnemonic}</Text>
        </View>
    );

  renderBody() {
      const { mnemonics } = this.state;
      if (!mnemonics) return (
      <TouchableOpacity style={styles.revealButton}
        onPress={() => this.handleMnemonicReveal()}>
        <Text>Reveal</Text>
      </TouchableOpacity>
      )
      return (
          <View style={styles.mnemonicsContainer}>
              {mnemonics.map(this.renderMnemonic)}
          </View>
      )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Wallet Screen</Text>
          <Text style={styles.message}>Please save this carefully!</Text>
        </View>
        {this.renderBody()}
        <View style={styles.mnemonicsContainer}>  
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
  mnemonicsContainer: {
    borderWidth: 1,
    borderRadius: 20,
    height: 60,
    
  },
  revealButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    margin: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  message: {
    fontSize: 14,
  },
  proceedButtonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    height: 104,
  }
})