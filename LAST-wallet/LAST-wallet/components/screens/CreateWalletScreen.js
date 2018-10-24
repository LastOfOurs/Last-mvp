import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import WordBox from '../widgets/WordBox'
import { colors, measures } from '../../common/styles';
var WalletUtils = require('../../common/utils/wallet.js')
import PropTypes from 'prop-types'

export default class CreateWalletScreen extends React.Component {
  static navigationOptions = { title: 'Create Wallet' }
  state = {
    mnemonics: null,
  }

  handleMnemonicReveal() {
    const mnemonics = WalletUtils.generateMnemonics()
    this.setState({ mnemonics })
  }

  handleProceed() {
    const { mnemonics } = this.state
    // const { walletName, walletDescription } = this.props.navigation.state.params
    this.props.navigation.navigate('ConfirmWalletCreation', { mnemonics })
  }

  renderMnemonic = (mnemonic, index) => (
    <View style={styles.mnemonic} key={index}>
        <WordBox words={mnemonic} />
    </View>
  )

  renderBody() {
    const { mnemonics } = this.state;
    if (!mnemonics) return (
      <TouchableOpacity style={styles.button}
        onPress={() => this.handleMnemonicReveal()}>
        <Text>Reveal</Text>
      </TouchableOpacity>
    )
    return (
      <View style={styles.mnemonicsContainer}>
          {this.state.mnemonics.map(this.renderMnemonic)}
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
        <View style={styles.proceedButtonContainer}>
          {this.state.mnemonics && (
            <TouchableOpacity style={styles.button}
            onPress={() => this.handleProceed()}>
            <Text>Proceed</Text>
          </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.defaultBackground,
    padding: measures.defaultPadding
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  mnemonicsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '80%',
    flexWrap: 'wrap',
  },
  button: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    margin: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  message: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32
  },
  mnemonic: {
    margin: 4
},
  proceedButtonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    padding: 5,
  }
})