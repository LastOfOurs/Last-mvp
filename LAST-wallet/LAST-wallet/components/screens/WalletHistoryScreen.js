import React from 'react'
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { measures, colors } from '../../common/styles'
var WalletActions = require('../../common/actions/walletActions')
import WalletBalance from '../widgets/WalletBalance'
import TransactionCard from '../widgets/TransactionCard'
import { GeneralActions } from '../../common/actions'

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
            // GeneralActions.notify(e.message, 'long')
            console.log('error loading wallet history: ' + e)
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
    );

    render() {
        return (
            <View style={styles.container}>
                <WalletBalance />
                {this.renderBody(this.props.wallet)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        padding: measures.defaultPadding
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