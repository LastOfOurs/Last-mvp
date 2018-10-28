import React from 'react'
import { View, WebView, StyleSheet, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { measures } from '../../common/styles'

export default class MarketplaceScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-basket${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  }
  render() {
    return (
      <WebView
        style={styles.mainContainer} 
        source={{uri: 'https://opensea.io/assets'}}
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
    marginTop: 20,
  },
})

