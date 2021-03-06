import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { colors } from '../../common/styles'
import Calculator from '../widgets/Calculator'
import PropTypes from 'prop-types'

export default class SendTransactionScreen extends React.Component {
  
  onPressContinue() {
    const { amount } = this.refs.calc
    if (!amount) return
    this.props.navigation.navigate('SelectDestination', { amount })
}

  render() {
      return (
          <View style={styles.container}>
            <Calculator ref="calc" />
            <Button title="Continue" onPress={() => this.onPressContinue()} />
          </View>
      );
  }
}

const styles = StyleSheet.create({
container: {
    backgroundColor: colors.defaultBackground,
    flex: 1,
    alignItems: 'stretch'
  }
})