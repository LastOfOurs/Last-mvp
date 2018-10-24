import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import PropTypes from 'prop-types'

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
          <Text style={styles.title}>Login Screen</Text>
          <TouchableOpacity style={styles.button}
            onPress={this._enter}>
            <Text>Press Me</Text>
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
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
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