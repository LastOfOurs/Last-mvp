import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { LinearGradient } from 'expo'

export default class LoginScreen extends React.Component {
  _enter = () => {
    this.props.navigation.navigate("Main")
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <LinearGradient colors={['#143C5A', '#0AAAD2', '#F7F7F7']} style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LAST Wallet</Text>
          <Image style={styles.logo} source={require('../../assets/last-logo.png')}/>
          <TouchableOpacity style={styles.button}
            onPress={this._enter}>
            {/* <LinearGradient colors={['#50FAB4', '#F7F7F7']} style={styles.button}> */}
            <Text style={styles.buttonText}>Enter the sanctuary</Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
        </View>
        <Image style={styles.footerImage} source={require('../../assets/tiger-heart-tails.png')}/>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#50FAB4',
    borderRadius: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 10,
  },
  titleLogo: {
    alignSelf: 'center',
    width: 300,
    height: 100,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
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
  footerImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
})