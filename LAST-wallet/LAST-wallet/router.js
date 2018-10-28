import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, NavigationActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import * as Screens from './components/screens'

export const INITIAL_ROUTE = 'WalletsOverview'

//Screens
import WalletInitScreen from './components/screens/WalletInitScreen'
import CreateWalletScreen from './components/screens/CreateWalletScreen'
import ImportWalletScreen from './components/screens/ImportWalletScreen'
import WalletDetailsScreen from './components/screens/WalletDetailsScreen'
import LastGameScreen from './components/screens/LastGameScreen'
import WalletSettingsScreen from './components/screens/WalletSettingsScreen'
import LoginScreen from './components/screens/LoginScreen'
import ConfirmWalletCreationScreen from './components/screens/ConfirmWalletCreationScreen'
import ImportWalletWithMnemonicsScreen from './components/screens/ImportWalletWithMnemonicsScreen'
import ImportWalletWithPKScreen from './components/screens/ImportWalletWithPKScreen'
import WalletNamingScreen from './components/screens/WalletNamingScreen'
import WalletsOverviewScreen from './components/screens/WalletsOverviewScreen'
import SendTransactionScreen from './components/screens/SendTransactionScreen'
import ReceiveTransactionScreen from './components/screens/ReceiveTransactionScreen'
import ConfirmTransactionScreen from './components/screens/ConfirmTransactionScreen'
import SelectDestinationScreen from './components/screens/SelectDestinationScreen'

const MainStack = createStackNavigator(
  {
    WalletInit: WalletInitScreen,
    WalletDetails: WalletDetailsScreen,
    CreateWallet: CreateWalletScreen,
    ConfirmWalletCreation: ConfirmWalletCreationScreen,
    ImportWallet: ImportWalletScreen,
    ImportWithPK: ImportWalletWithPKScreen,
    ImportWithMnemonic: ImportWalletWithMnemonicsScreen ,
    WalletNaming: WalletNamingScreen,
    WalletsOverview: WalletsOverviewScreen,
    WalletSettings: WalletSettingsScreen,
    SendTransaction: SendTransactionScreen,
    ReceiveTransaction: ReceiveTransactionScreen, 
    ConfirmTransaction: ConfirmTransactionScreen,
    SelectDestination: SelectDestinationScreen,
  },
  {
    initialRouteName: INITIAL_ROUTE,
    navigationOptions: {
      headerTintColor: "#59F8B6",
      headerStyle: {
        backgroundColor: "#10171F"
      }
    }
  }
)

MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
}

const MainTabs = createBottomTabNavigator(
  {
    Wallet: MainStack,
    LastGame: LastGameScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "#153C59"
    }
  }
);

const AppNavigator = createSwitchNavigator(
  {
  Login: LoginScreen,
  Main: MainTabs,
  WalletDetails: WalletDetailsScreen
  },
  {
    initialRouteName: "Login"
  }
)

const parentGetStateForAction = MainTabs.router.getStateForAction;

MainTabs.router.getStateForAction = (action, inputState) => {
    const state = parentGetStateForAction(action, inputState);
    
    // fix it up if applicable
    if (state && action.type === NavigationActions.NAVIGATE) {
        if (action.params && action.params.replaceRoute) {
            const leave = action.params.leave || 1
            delete action.params.replaceRoute
            while (state.routes.length > leave && state.index > 0) {
                const oldIndex = state.index - 1
                // remove one that we are replacing
                state.routes.splice(oldIndex, 1)
                // index now one less
                state.index = oldIndex
            }
        }
    }

    return state
};

export default AppNavigator