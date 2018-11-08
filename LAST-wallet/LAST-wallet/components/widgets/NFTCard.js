import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { Icon } from './Icon'
import { colors, measures } from '../../common/styles'
import TransactionDetails from './TransactionDetails'
var WalletUtils = require('../../common/utils/wallet')

export default class NFTCard extends React.Component {
    
    //Todo: Optimize performance with PureComponent or shouldComponentUpdate
    
    render() {
        const { NFT } = this.props
        return (
            <TouchableHighlight onPress={() => console.log('meow')}>
                <View style={styles.container}>
                    <Text>{NFT.token.name}</Text>
                    <Text>Kitty# {NFT._tokenId}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        height: 64,
        marginBottom: measures.defaultMargin,
    },
    leftColumn: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    centerColumn: {
        flex: 1,
        height: 64,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    operatorLabel: {
        fontWeight: 'bold',
        fontSize: measures.fontSizeMedium
    },
    rightColumn: {
        paddingHorizontal: measures.defaultPadding,
        width: 150,
        flexDirection: 'row',
    },
    amountContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    confirmationsContainer: {
        marginLeft: measures.defaultMargin,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20
    },
    amountLabel: {
        fontWeight: 'bold',
        fontSize: measures.fontSizeMedium
    },
    fiatLabel: {
        fontSize: measures.fontSizeMedium - 4
    }
})