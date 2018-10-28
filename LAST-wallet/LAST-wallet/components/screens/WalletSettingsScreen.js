import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { colors, measures } from '../../common/styles'
import { Icon } from '../widgets/Icon'
var WalletActions = require('../../common/actions/walletActions.js')
var GeneralActions = require('../../common/actions/generalActions.js')
import ListItem from '../widgets/ListItem'

@inject('wallet')
@observer
export default class WalletSettingsScreen extends React.Component {

    async removeWallet() {
        try {
            const { wallet } = this.props;
            await WalletActions.removeWallet(wallet.item);
            this.props.navigation.goBack();
            await WalletActions.saveWallets();
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    showPK() {
        const { wallet } = this.props;
        this.props.navigation.push('ShowPrivateKey', { wallet });
    }

    confirmRemoveWallet() {
        Alert.alert(
            'Remove wallet',
            'This action cannot be undone. Are you sure?',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'Remove', onPress: () => this.removeWallet() }
            ],
            { cancelable: false }
        );
    }

    confirmExportPK() {
        Alert.alert(
            'Export private key',
            'Make sure you are alone and no one else will see your private key.',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'Continue', onPress: () => this.showPK() }
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListItem onPress={() => this.confirmExportPK()}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='key' type='mdc' />
                        </View>
                        <Text style={styles.itemTitle}>Export private key</Text>
                    </View>
                </ListItem>
                <ListItem onPress={() => this.confirmRemoveWallet()}>
                    <View style={styles.itemContainer}>
                        <View style={styles.icon}>
                            <Icon name='trash' />
                        </View>
                        <Text style={styles.itemTitle}>Remove wallet</Text>
                    </View>
                </ListItem>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 24,
        height: 24,
        margin: measures.defaultMargin
    },
    itemTitle: {
        fontSize: measures.fontSizeMedium
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