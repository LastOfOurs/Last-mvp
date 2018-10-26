import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, FlatList, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import GeneralActions from '../../common/actions/generalActions'
import WalletActions from '../../common/actions/walletActions'
import PricesActions from '../../common/actions/pricesActions'

// @inject('prices', 'wallets')
@inject('wallets')
@observer
export default class WalletsOverviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Overview',
    headerRight: (
        <Button title='+'onPress={() => navigation.navigate('WalletInit')} />
    ),
  })

  // get loading() { return this.props.prices.loading || this.props.wallets.loading }
  get loading() { return this.props.wallets.loading } 

  async populate() {
    try {
        await Promise.all([
            WalletActions.loadWallets(),
            // PricesActions.getPrice()
        ]);
    } catch (e) {
        // GeneralActions.notify(e.message, 'long');
        console.log('error populating page because ' + e)
    }
  }
 
  componentDidMount() {
    this.populate();
  }

  // renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />
  renderItem = ({ item }) => <Text>I'd be impressed if you see this {item} </Text>
  
  renderBody = (list) => (!list.length && !this.loading) ? 
    <View style={styles.noWalletsMessageContainer}>
      <Text style={styles.message}>
          There are no wallets configured. Click on the + button to add a new one.
      </Text>
    </View> : (
    <FlatList
        style={styles.content}
        data={list}
        refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
        keyExtractor={(item, index) => String(index)}
        renderItem={this.renderItem} />
    );
  
  render() {
    const { list } = this.props.wallets;
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallets Overview Screen</Text>
          {this.renderBody(list)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center'
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
  }
})