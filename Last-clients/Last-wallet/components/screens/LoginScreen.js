import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'

export default class LoginScreen extends React.Component {
  _enter = () => {
    this.props.navigation.navigate("Main")
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require('../../assets/last-logo.png')}/>
          <TouchableOpacity style={styles.button}
            onPress={this._enter}>
            <Text style={styles.title}>Enter your Sanctuary</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    margin: 5
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