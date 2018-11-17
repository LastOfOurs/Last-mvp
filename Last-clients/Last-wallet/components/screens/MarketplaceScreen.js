import React from 'react'
import { WebView, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons'

@inject('wallet')
@observer
export default class MarketplaceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Marketplace',
    headerTitle: 'Marketplace',
  })

  render() {
    const wallet = this.props.wallet.item
    return (
      <WebView
        style={styles.mainContainer} 
        source={{uri: 'https://rinkeby.opensea.io/assets?sortBy=assets_prod_rinkeby&toggle%5Bon_sale%5D=true'}}
        renderLoading={()=>{return(<ActivityIndicator style={styles.activityLoader} />)}}
        startInLoadingState
      >
        <StatusBar backgroundColor='blue' barStyle='dark-content'/>
      </WebView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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

