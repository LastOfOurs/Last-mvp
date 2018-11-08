import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
const WalletActions = require('../../common/actions/walletActions.js')
import getWeb3 from '../../common/utils/web3Utils'
import PropTypes from 'prop-types'

@inject('prices', 'wallet')
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

  render() {
    const { loading } = this.props
    const totalCollectibles = this.state.NFTs.length
    console.log(this.state.NFTs)
    if (loading) {
      return (
        <ActivityIndicator style={styles.activityLoader} />
      )
    } else if (totalCollectibles === 0) {
      return (
        <View>
          <Text>No collectibles found! Add a token to view your collectibles</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Image style={{width: 100, height: 100}} source={{uri: this.state.NFTs[0].token.image}}/>
          <Text>{this.state.NFTs[0]._tokenId}</Text>
          <Text>{this.state.NFTs[0].token.name}</Text>
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