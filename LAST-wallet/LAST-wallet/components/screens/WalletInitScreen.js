import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'

export default class WalletInitScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Last of Ours',
    }
  }

  handleCreateWallet = () => {
    console.log('wallet created')
  }

  handleImportWallet = () => {
    console.log('wallet imported')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require('../../assets/last-logo.png')}/>
          <Text>Wallet Init Screen</Text>
          <Button title={'Create New Wallet'} onPress={this.handleCreateWallet} />
          <Button title={'Import Existing Wallet'} onPress={this.handleImportWallet}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  button: {

  }
})