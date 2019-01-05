import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { inject, observer } from 'mobx-react'
import { colors, measures } from '@common/styles'

const ListItem = ({ children, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.listItemContainer} children={children} />
    </TouchableWithoutFeedback>
  )

@inject('prices')
@observer
export default class SelectCurrencyScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Select currency'
    })

    //TODO
    selectCurrency(currency) {

    }
    
    renderItems = (items) => items.map((item, index) => (
        <ListItem onPress={item.action} key={index}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
        </ListItem>
    ))

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderItems([
                    { title: 'Dollar', action: () => this.selectCurrency('usd') },
                    { title: 'Euro', action: () => this.selectCurrency('eur') },
                ])}
            </ScrollView>
        )
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
    itemTitle: {
        fontSize: measures.fontSizeMedium,
        margin: measures.defaultMargin
    },
    listItemContainer: {
      height: 64,
      alignItems: 'stretch',
      justifyContent: 'center',
      padding: measures.defaultPadding
    },
})