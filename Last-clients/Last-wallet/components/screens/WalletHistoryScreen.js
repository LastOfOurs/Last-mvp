import React from 'react'
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { measures, colors } from '../../common/styles'
import WalletBalance from '../widgets/WalletBalance'
import TransactionCard from '../widgets/TransactionCard'
import { LinearGradient } from 'expo'
var WalletActions = require('../../common/actions/walletActions')
var GeneralActions = require('../../common/actions/generalActions')

const NoTransactions = () => (
  <View style={styles.noTransactionsContainer}>
    <Text style={styles.noTransactionsMessage}>No transactions found for this address.</Text>
  </View>
)

@inject('wallet')
@observer
export default class WalletHistoryScreen extends React.Component {

    componentDidMount() {
        this.updateHistory()
    }

    async updateHistory() {
        try {
            await WalletActions.updateHistory(this.props.wallet.item)
        } catch (e) {
            GeneralActions.notify(e.message, 'long')
        }
    }

    renderItem = (address) => ({ item }) => <TransactionCard transaction={item} walletAddress={address} />

    renderBody = ({ item, history, loading, pendingTransactions }) =>  (!history.length && !loading) ? <NoTransactions /> : (
        <FlatList
            style={styles.content}
            data={pendingTransactions.concat(history.slice().reverse())}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.updateHistory()} />}
            keyExtractor={(element) => element.hash}
            renderItem={this.renderItem(item.getAddress())} />
    )

    render() {
        return (
            <View style={styles.mainContainer}>
                <LinearGradient colors={['#143C5A', '#0AAAD2', '#F7F7F7']} style={styles.mainContainer}>
                    <WalletBalance />
                    {this.renderBody(this.props.wallet)}
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        marginTop: measures.defaultMargin
    },
    noTransactionsContainer: {
      alignItems: 'center',
      paddingTop: measures.defaultPadding
    },
    noTransactionsMessage: {
      color: colors.black
    },
})