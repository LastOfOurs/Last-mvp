import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { inject, observer } from 'mobx-react'
import { colors, measures } from '../../common/styles'
var WalletUtils = require('../../common/utils/wallet')
const WalletActions = require('../../common/actions/walletActions.js')

@inject('prices', 'wallet')
@observer
export default class EggBalance extends React.Component {

    state = {
        eggBalance: 0
    }
    
    componentDidMount() {
        this.fetchEggBalance()
    }

    async fetchEggBalance() {
        try {
            let balance = await WalletActions.getEggBalance(this.props.wallet.item)
            this.setState({ eggBalance: this.props.wallet.eggBalance })
          } catch (e) {
            // GeneralActions.notify(e.message, 'long')
            console.log(e)
          }
    }
    
    get balance() {
        return this.props.wallet.eggBalance
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.title}>My Eggs:</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.balance}>{this.state.eggBalance} </Text>
                    <Image style={styles.eggImage} source={require('../../assets/egg.png')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        flexDirection: 'row',
        borderBottomColor: colors.lightGray,
        padding: 10,
        margin: 20
    },
    leftColumn: {
        flex: 1
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: measures.fontSizeMedium,
        color: colors.white
    },
    balance: {
        fontSize: measures.fontSizeMedium + 2,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white
    },
    fiatBalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.white
    },
    eggImage: {
        width: 40,
        height: 40,
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
    }
})