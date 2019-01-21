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
       this.updateEggBalance()
    }

    async updateEggBalance() {
        try {
          await WalletActions.getEggBalance(this.props.wallet.item)
          this.setState({ eggBalance: this.props.wallet.eggBalance })
        } catch (e) {
          // GeneralActions.notify(e.message, 'long')
          console.log(e)
        }
      }
    
    get eggBalance() {
        return Number(this.props.wallet.eggBalance)
        // return Number(WalletUtils.formatBalance(item.eggBalance))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.title}>My Eggs:</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.title}>{this.state.eggBalance}</Text>
                    <Image style={styles.eggBalance} source={require('../../assets/egg.png')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: colors.lightGray,
        padding: 10,
        margin: 20
    },
    leftColumn: {
        flex: 1
    },
    eggBalance: {
      width: 40,
      height: 40,
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
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})