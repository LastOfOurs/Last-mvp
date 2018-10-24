import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import WalletInitScreen from './components/screens/WalletInitScreen'
import CreateWalletScreen from './components/screens/CreateWalletScreen'
import ImportWalletScreen from './components/screens/ImportWalletScreen'
import WalletDetailsScreen from './components/screens/WalletDetailsScreen'
import LastGameScreen from './components/screens/LastGameScreen'
import SettingsScreen from './components/screens/SettingsScreen'
import LoginScreen from './components/screens/LoginScreen'

const MainStack = createStackNavigator(
  {
    WalletInit: WalletInitScreen,
    CreateWallet: CreateWalletScreen,
    ImportWallet: ImportWalletScreen,
  },
  {
    initialRouteName: "WalletInit",
    navigationOptions: {
      headerTintColor: "#a41034",
      headerStyle: {
        backgroundColor: "#fff"
      }
    }
  }
);

MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
};

const MainTabs = createBottomTabNavigator(
  {
    Wallet: WalletDetailsScreen,
    LastGame: LastGameScreen,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034"
    }
  }
);

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabs
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  }
});
