import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { colors, measures } from '../../common/styles'
import ConfirmMnemonicsBox from '../widgets/ConfirmMnemonicsBox'
var WalletUtils = require('../../common/utils/wallet.js')
var GeneralActions = require('../../common/actions/generalActions.js')
var WalletActions = require('../../common/actions/walletActions.js')

export default class ConfirmWalletCreationScreen extends React.Component {
    static navigationOptions = { 
      title: 'Create Wallet' 
    }
    state = {
      mnemonics: []
    }

    componentDidMount() {
        const { mnemonics, walletName, walletDescription } = this.props.navigation.state.params
        this.setState({ mnemonics, walletName, walletDescription })
        console.log('new wallet created! mnemonics are: '+ mnemonics)
    }

    async handleConfirm() {
        if (!this.refs.confirm.isValidSequence()) {
            alert('Invalid sequence!')
            return
        }
        try {
            const { mnemonics, walletName, walletDescription } = this.state;
            const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
            await WalletActions.addWallet(walletName, wallet, walletDescription)
            await WalletActions.saveWallets()
            this.props.navigation.navigate('WalletsOverview')
            navigation.dismiss()
        } catch (e) {
            GeneralActions.notify(e.message, 'long')
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
              <View style={styles.mnemonicsContainer}>
                <ConfirmMnemonicsBox ref='confirm' mnemonics={this.state.mnemonics} />
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.handleConfirm()}>
                  <Text>Create Wallet!</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: colors.defaultBackground
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    mnemonicsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '80%'
    },
    mnemonic: {
        margin: 4
    },
    button: {
      padding: 10,
      backgroundColor: '#E0E0E0',
      margin: 7,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignSelf: 'center'
    }
});
