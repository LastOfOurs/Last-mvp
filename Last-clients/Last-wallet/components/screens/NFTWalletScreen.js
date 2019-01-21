import React from 'react'
import { inject, observer } from 'mobx-react'
import { LinearGradient } from 'expo'
// import { Svg, Image } from 'react-native-svg'
import SvgUri from 'react-native-svg-uri'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
const WalletActions = require('../../common/actions/walletActions.js')
import NFTCard from '../widgets/NFTCard'
import WalletBalance from '../widgets/WalletBalance'
import EggBalance from '../widgets/EggBalance'
import ErrorMessage from '../widgets/ErrorMessage'
import SuccessMessage from '../widgets/SuccessMessage'

const NoNFTs = () => (
  <View style={styles.noTransactionsContainer}>
    <Text style={styles.noTransactionsMessage}>No NFTs found for this address.</Text>
  </View>
)

@inject('wallet')
@observer
export default class NFTWalletScreen extends React.Component {
  static navigationOptions = { title: 'LAST' }
  state = {
    NFTs: [],
    eggBalance: 0,
    eggsToSend: 0,
    recipientAddress: '',
  }
  
  componentDidMount() {
    this.updateNFTs()
  }
  
  async updateNFTs() {
    try {
      // await WalletActions.fetchNFTs(this.props.wallet.item)
      await WalletActions.getEggBalance(this.props.wallet.item)
      this.setState({ eggBalance: this.props.wallet.eggBalance })
    } catch (e) {
      // GeneralActions.notify(e.message, 'long')
      console.log(e)
    }
  }

 async getEggs() {
  try {
      await WalletActions.claimEggs(this.props.wallet.item)
      // this.setState({ NFTs: this.props.wallet.NFTs })
    } catch (e) {
      // GeneralActions.notify(e.message, 'long')
      console.log(e)
    }
  }

  incrementToSend() {
    if (this.state.eggsToSend < this.state.eggBalance) {
      this.setState({ eggsToSend: this.state.eggsToSend + 1 })
    }
  }

  decrementToSend() {
    if (this.state.eggsToSend > 0) {
      this.setState({ eggsToSend: this.state.eggsToSend - 1 })
    }
  }

  async continueToSend() {
    try {
      await WalletActions.sendEggs(this.state.recipientAddress, this.state.eggsToSend)
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
          <WalletBalance />
          <EggBalance />
            <View style={styles.titleContainer}>
              {/* <Text style={styles.title} >You have eggs to claim! Claim eggs to bring animals into your sanctuary wallet</Text>  
              <TouchableOpacity style={styles.button}
                onPress={this.getEggs.bind(this)}>
                <Text style={styles.buttonText}>Claim Eggs</Text>
              </TouchableOpacity> */}
              <Text style={styles.title} >Claim your eggs to your wallet or send eggs to others, gas free!</Text>
              <View style={styles.eggSendContainer}> 
              <Text style={styles.title}> Send  </Text> 
              <TouchableOpacity style={styles.button}
                  onPress={this.decrementToSend.bind(this)}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{this.state.eggsToSend} </Text>
                <TouchableOpacity style={styles.button}
                  onPress={this.incrementToSend.bind(this)}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.title}> eggs.  </Text>
              </View >
              <TextInput
                style={{height: 40, width: 300, borderColor: '#143C5A', borderRadius: 10, margin: 5, borderWidth: 1, padding: 2, fontFamily: 'Poppins-Medium'}}
                onChangeText={(text) => this.setState({ recipientAddress: text })}
                placeholder={'Recipient address...'}
                value={this.state.recipientAddress}
              />
              <TouchableOpacity style={styles.button}
                  onPress={this.continueToSend.bind(this)}>
                  <Text style={styles.buttonText}>Confirm send</Text>
                </TouchableOpacity>
          </View>
          {/* <Image style={styles.footerImage} source={require('../../assets/united-hands.png')}/> */}
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
  eggSendContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
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