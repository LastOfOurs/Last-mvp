import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, FlatList, RefreshControl } from 'react-native'
import { inject, observer } from 'mobx-react'
import WalletCard from '../widgets/WalletCard'
import { measures, colors } from '../../common/styles'
import { HeaderIcon } from '../widgets/HeaderIcon'
var PricesActions = require('../../common/actions/pricesActions')
var WalletActions = require('../../common/actions/walletActions')
var GeneralActions = require('../../common/actions/generalActions')

@inject('prices', 'wallets')
@observer
export default class WalletsOverviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Last of Ours',
    headerLeft: (
      <HeaderIcon
        name='add'
        size='large'
        color={colors.white}
        onPress={() => navigation.navigate('WalletInit')} />
    ),
    headerRight: (
      <HeaderIcon
        name='settings'
        size='medium'
        type='md'
        color={colors.white}
        onPress={() => navigation.navigate('Settings')} />
    ),
  })

  get loading() { return this.props.prices.loading || this.props.wallets.loading }

  async populate() {
    try {
        await Promise.all([
            WalletActions.loadWallets(),
            PricesActions.getPrice()
        ])
    } catch (e) {
        GeneralActions.notify(e.message, 'long')
    }
  }
 
  componentDidMount() {
    this.populate()
  }

  handleWalletPressed(wallet) {
    if (this.loading) return
    WalletActions.selectWallet(wallet)
    this.props.navigation.navigate('WalletDetails', { wallet })
}

  renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.handleWalletPressed(item)} />
  
  renderBody = (list) => (!list.length && !this.loading) ? 
    <View style={styles.noWalletsMessageContainer}>
      <Text style={styles.message}>
          There are no wallets configured on this device. Click on the + button to add one!
      </Text>
    </View> : (
    <FlatList
        style={styles.content}
        data={list}
        refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
        keyExtractor={(item, index) => String(index)}
        renderItem={this.renderItem} />
    )
 
  render() {
    const { list } = this.props.wallets
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallets Overview Screen</Text>
        </View>
          {this.renderBody(list)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: measures.defaultPadding,
  },
  titleContainer: {
    alignItems: 'center',
    margin: 10
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
  },
  content: {
    marginTop: measures.defaultMargin,
    padding: 5
  }
})