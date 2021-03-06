import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NumberPad } from './NumberPad'
import { colors } from '../../common/styles'
import CalculatorPanel from './CalculatorPanel'

export default class Calculator extends React.Component {

    get amount() {
        return this.refs.panel.wrappedInstance.amount;
    }

    onPressNumber(number) {
        this.refs.panel.wrappedInstance.onChange(number);
    }

    render() {
        return (
            <View style={styles.container}>
                <CalculatorPanel ref="panel" />
                <View style={styles.bottomContainer}>
                    <NumberPad onPressNumber={(number) => this.onPressNumber(number)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 5,
        alignItems: 'stretch'
    },
    bottomContainer: {
        flex: 4,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});