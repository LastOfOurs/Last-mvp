import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { colors, measures } from '../../common/styles'
import ConfirmMnemonicsBox from '../widgets/ConfirmMnemonicsBox'
var WalletUtils = require('../../common/utils/wallet.js')
// var GeneralActions = require('../../common/actions/general.js')
// var WalletActions = require('../../common/actions/wallet.js')

export default class ConfirmWalletCreationScreen extends React.Component {
    static navigationOptions = { 
      title: 'Create Wallet' 
    }
    state = {
      mnemonics: []
    }

    componentDidMount() {
        const { mnemonics } = this.props.navigation.state.params;
        this.setState({ mnemonics })
    }

    async handleConfirm() {
        if (!this.refs.confirm.isValidSequence()) return;
        try {
            const { mnemonics } = this.state;
            const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics);
            // await WalletActions.addWallet(walletName, wallet, walletDescription);
            console.log('wallet created')
            // await WalletActions.saveWallets();
        } catch (e) {
            // GeneralActions.notify(e.message, 'long');
            console.log(e)
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
              <ConfirmMnemonicsBox ref='confirm' mnemonics={this.state.mnemonics} />
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
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '80%'
    },
    mnemonic: {
        margin: 4
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        height: 104
    }
});
