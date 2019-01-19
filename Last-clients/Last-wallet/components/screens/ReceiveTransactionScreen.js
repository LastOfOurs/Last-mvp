import React from 'react'
import { Clipboard, Share, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import QRCode from 'react-native-qrcode-svg'
import { colors, measures } from '../../common/styles'
import { LinearGradient } from 'expo'
var GeneralActions = require('../../common/actions/generalActions.js')

@inject('wallet')
@observer
export default class ReceiveTransactionScreen extends React.Component {
  
  copyToClipboard() {
    const { item } = this.props.wallet;
    Clipboard.setString(item.getAddress());
    GeneralActions.notify('Copied to clipboard', 'short')
  }

  share() {
      const { item } = this.props.wallet
      Share.share({
          title: 'Wallet address:',
          message: item.getAddress()
      })
  }

  renderColumn = (icon, label, action) => (
      <TouchableWithoutFeedback onPress={action}>
          <View style={styles.actionColumn}>
              <Text style={styles.title}>{label}</Text>
          </View>
      </TouchableWithoutFeedback>
  );
  
  render() {
    const { wallet: { item } } = this.props
    return (
      <View style={styles.mainContainer}>
      <LinearGradient colors={['#143C5A', '#0AAAD2', '#F7F7F7']} style={styles.mainContainer}>
        <Text style={styles.title}>My public address to receive ETH</Text>
        <View style={styles.QRCode}>
        </View>
        <Text style={styles.title}>{item.getAddress()}</Text>
        <View style={styles.actions}>
          <View style={styles.actionsBar}>
            {this.renderColumn('copy', 'Copy', () => this.copyToClipboard())}
            {this.renderColumn('share', 'Share', () => this.share())}
          </View>
        </View>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
  },
  actions: {
      height: 56,
  },
  actionsBar: {
      flexDirection: 'row',
      flex: 3,
  },
  actionColumn: {
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 7,
      margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#143C5A'
  },
  title: {
      alignSelf: 'center',
      fontFamily: 'Poppins-SemiBold',
      color: 'white'
  },
  QRCode: {
        alignSelf: 'center',
  }
})