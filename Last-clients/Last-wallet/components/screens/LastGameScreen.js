import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class LastGameScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Last Game',
    headerTitle: 'Last Game',
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Last Game Screen</Text>
          <Image style={styles.logo} source={require('../../assets/animals/giant-panda.png')}/>
          <Image style={styles.logo} source={require('../../assets/animals/black-rhino.png')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins-SemiBold'
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 10,
  },
})