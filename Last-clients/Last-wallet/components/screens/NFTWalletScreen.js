import React from 'react'
import { inject, observer } from 'mobx-react'
import { Svg, Image } from 'react-native-svg'
import SvgUri from 'react-native-svg-uri'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
const WalletActions = require('../../common/actions/walletActions.js')
import NFTCard from '../widgets/NFTCard'

const NoNFTs = () => (
  <View style={styles.noTransactionsContainer}>
    <Text style={styles.noTransactionsMessage}>No NFTs found for this address.</Text>
  </View>
)

@inject('wallet')
@observer
export default class NFTWalletScreen extends React.Component {
  static navigationOptions = { title: 'My NFTs' }
  state = {
    NFTs: [],
  }
  
  componentDidMount() {
    this.updateNFTs()
  }
  
  async updateNFTs() {
    try {
      await WalletActions.fetchNFTs(this.props.wallet.item)
      this.setState({ NFTs: this.props.wallet.NFTs })
    } catch (e) {
      // GeneralActions.notify(e.message, 'long')
      console.log(e)
    }
  }

  async getEggs() {
    try {
      await WalletActions.requestNFTs(this.props.wallet.item)
      // this.setState({ NFTs: this.props.wallet.NFTs })
    } catch (e) {
      // GeneralActions.notify(e.message, 'long')
      console.log(e)
    }
  }

  renderItem = () => ({ item }) => <NFTCard NFT={item} />

  renderBody = ({ NFTs }) =>  (!NFTs) ? <NoNFTs /> : (
  <FlatList
      style={styles.content}
      data={NFTs}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => this.updateNFTs()} />}
      keyExtractor={(index) => index.toString()}
      renderItem={this.renderItem()} /> 
)

  render() {
    const { loading } = this.props
    const totalCollectibles = this.state.NFTs.length
    if (loading) {
      return (
        <ActivityIndicator style={styles.activityLoader} />
      )
    } else if (totalCollectibles === 0) {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title} >No animals found! Claim an egg to add animals to your sanctuary</Text>
          <TouchableOpacity style={styles.button}
            onPress={this.getEggs.bind(this)}>
            <Text style={styles.title}>Claim my Eggs</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.mainContainer}>
          {this.renderBody(this.props.wallet)} 
        </View>  
      )  
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold'
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
    padding: 20
  },
  activityLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})