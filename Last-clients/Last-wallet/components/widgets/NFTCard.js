import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native'
import { measures } from '../../common/styles'

export default class NFTCard extends React.PureComponent {
    
    //Todo: Add pictures and style the card
    
    render() {
        const { NFT } = this.props
        return (
            <TouchableHighlight onPress={() => console.log('meow')}>
                <View style={styles.container}>
                    <Text style={styles.title}>{NFT.token.name}</Text>
                    <Text> LAST # {NFT.id}</Text>
                    <Image
                        style={{width: 70, height: 70}}
                        source={{uri: NFT.token.image}} />
                    <Text> Favorite Activity: {NFT.token.favoriteActivity}</Text>
                    <Text> Bio: {NFT.token.description}</Text>
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
        flexDirection: 'column',
        backgroundColor: '#1FABD0',
        marginBottom: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
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