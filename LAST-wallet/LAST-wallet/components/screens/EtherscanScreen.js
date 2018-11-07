import React from 'react'
import { WebView, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'

export default class EtherscanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Etherscan',
    headerTitle: 'Etherscan',
  })

  render() {
    const hash = this.props.transaction.hash
    return (
      <WebView
        style={styles.mainContainer} 
        source={{uri: 'https://rinkeby.etherscan.io/tx/' + hash}}
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

