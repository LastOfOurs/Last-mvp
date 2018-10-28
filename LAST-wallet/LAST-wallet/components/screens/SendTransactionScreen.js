import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { colors } from '../../common/styles'
import PropTypes from 'prop-types'

export default class SendTransactionScreen extends React.Component {
  
  onPressContinue() {
    // const { amount } = this.refs.calc;
    // if (!amount) return;
    // this.props.navigation.navigate('SelectDestination', { amount });
    console.log('sending')
}

  render() {
      return (
          <View style={styles.container}>
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
});