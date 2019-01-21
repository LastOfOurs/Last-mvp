import React from 'react'
import { inject, observer } from 'mobx-react'
import { LinearGradient } from 'expo'
// import { Svg, Image } from 'react-native-svg'
import SvgUri from 'react-native-svg-uri'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
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
        <View style={styles.mainContainer}>
          <LinearGradient colors={['#143C5A', '#0AAAD2', '#F7F7F7']} style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} >No animals found! Claim an egg to add animals to your sanctuary</Text>  
              <TouchableOpacity style={styles.button}
                onPress={this.getEggs.bind(this)}>
                <Text style={styles.buttonText}>Claim my Eggs</Text>
              </TouchableOpacity>
          </View>
          <Image style={styles.footerImage} source={require('../../assets/united-hands.png')}/>
          </LinearGradient>
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
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white'
  },
  button: {
    padding: 7,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#143C5A'
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    margin: 5,
    color: 'white'
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
  footerImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
})