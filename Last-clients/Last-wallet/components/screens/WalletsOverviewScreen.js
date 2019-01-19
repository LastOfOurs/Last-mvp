import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar, FlatList, RefreshControl } from 'react-native'
import { inject, observer } from 'mobx-react'
import WalletCard from '../widgets/WalletCard'
import { measures, colors } from '../../common/styles'
import { HeaderIcon } from '../widgets/HeaderIcon'
import { LinearGradient } from 'expo'
var PricesActions = require('../../common/actions/pricesActions')
var WalletActions = require('../../common/actions/walletActions')
var GeneralActions = require('../../common/actions/generalActions')

@inject('prices', 'wallets')
@observer
export default class WalletsOverviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'My Wallets',
    titleStyle: {
      fontFamily: 'Poppins-SemiBold'
    },
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
    try {
      WalletActions.selectWallet(wallet)
      this.props.navigation.navigate('WalletDetails', { wallet })
    } catch (e) {
      console.log(e)
    }
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
      <LinearGradient colors={['#143C5A', '#0AAAD2', '#F7F7F7']} style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select a wallet to view your animals</Text>
        </View>
          {this.renderBody(list)}
          <Image style={styles.footerImage} source={require('../../assets/panda-back.png')}/>
        </LinearGradient>
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
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white'
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
  },
  footerImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
})