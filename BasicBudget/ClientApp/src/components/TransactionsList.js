import React, { Component } from 'react';

export class TransactionsList extends Component {
  static displayName = TransactionsList.name;

  constructor(props) {
    super(props);
    this.state = { transactions: [], loading: true };
  }

  componentDidMount() {
    this.populateTransactionsList();
  }

  static renderTransactionsListTable(transactions) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Short Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transactionsList =>
            <tr key={transactionsList.shortname}>
              <td>{transactionsList.shortname}</td>
              <td>{transactionsList.amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : TransactionsList.renderTransactionsListTable(this.state.transactions);

    return (
      <div>
        <h1 id="tabelLabel" >Transactions</h1>
        <p>Fetching from MongoDb</p>
        {contents}
      </div>
    );
  }

  async populateTransactionsList() {
    const response = await fetch('transaction-list');
    const data = await response.json();
    this.setState({ transactions: data, loading: false });
  }
}
