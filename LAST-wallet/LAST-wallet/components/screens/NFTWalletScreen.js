import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { fetchTransactionsBegin } from '../../common/actions/transactionActions'
import getWeb3 from '../../common/utils/web3Utils'
import PropTypes from 'prop-types'

export class NFTWalletScreen extends React.Component {
  static navigationOptions = { title: 'My NFTs' }
  
  toggleModal = tokenId => {
    return () => {
      let modals = this.state.modals
      modals[tokenId] = !modals[tokenId]
      this.setState({ modals })
    }
  }
  
  componentDidMount() {
    this.updateTransactions()
  }
  
  async updateTransactions() {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    let contracts = localStorage.getItem("tokens")
    contracts = contracts.split(",")
  
    this.props.getTransactions(accounts[0], contracts);
    this.setState({ accounts });
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.contracts !== prevProps.contracts) {
      this.updateTransactions();
    }
    if (this.props.error) {
      toast.error(this.props.error.message);
    }
  }
  
  separator(i, name) {
    return (
      <Separator>
        <SeparatorHeadline>{name}</SeparatorHeadline>
      </Separator>
    );
  }
  
  totalCollectibles(transactions) {
    return Object.keys(transactions).reduce((initVal, currVal) => {
      return initVal + transactions[currVal].length;
    }, 0);
  }
  
  render() {
    const { modals } = this.state
    const { transactions, loading } = this.props
    const totalCollectibles = this.totalCollectibles(transactions)
    if (loading) {
      return (
        <ActivityIndicator style={styles.activityLoader} />
      )
    } else if (totalCollectibles === 0) {
      return (
        <View>
          <Text>No collectibles found! Add a token to view your collectibles</Text>
        </View>
      )
    } else {
      return (
        <View>
          {Object.keys(transactions).map((contractAddress, i) => (
            <View key={i}>
              {transactions[contractAddress].length > 0 &&
                this.separator(i, transactions[contractAddress][0].name)}
              <View>
                {transactions[contractAddress].map(
                  ({ token, _tokenId, name, contract, link }, j) => (
                    <Token
                      key={j}
                      token={token}
                      tokenId={_tokenId}
                      link={link}
                      name={name}
                      contract={contract}
                      modals={modals}
                      toggleModal={this.toggleModal}
                      account={this.state.accounts[0]}
                    />
                  )
                )}
              </View> 
          </View>
          ))}    
        </View>  
      )  
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>NFT Wallet Screen</Text>
          
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
getTransactions: fetchTransactionsBegin
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.items,
    loading: state.transactions.loading,
    // contracts: state.contracts.items,
    error: state.transactions.error
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NFTWalletScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    margin: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center'
  },
  activityLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})