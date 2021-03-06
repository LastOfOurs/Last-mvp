import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Icon } from './Icon'
import { colors, measures } from '../../common/styles'
var WalletUtils = require('../../common/utils/wallet.js')
var WalletActions = require('../../common/actions/walletActions.js')

@inject('prices')
@observer
export default class WalletCard extends React.Component {

    get balance() {
        if (!this.props.wallet.balance) return 0
        return Number(WalletUtils.formatBalance(this.props.wallet.balance))
    }

    get fiatBalance() {
        return Number(this.props.prices.usd * this.balance)
    }

    componentDidMount() {
        try {
            WalletActions.updateBalance(this.props.wallet)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { onPress, wallet } = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                      <Icon name='wallet' size='large' type='ent' />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{wallet.name}</Text>
                        <Text style={styles.description}>{wallet.description}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{this.balance.toFixed(3)}</Text>
                            <Text style={styles.fiatBalance}>US$ {this.fiatBalance.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: measures.defaultPadding,
        height: 70,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 10,
        margin: 10,
    },
    leftColumn: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.gray,
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.gray,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.gray,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});