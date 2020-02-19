import React, { Component } from 'react';
import { AddNew } from './AddNew';

export class TransactionsList extends Component {
  static displayName = TransactionsList.name;

  constructor(props) {
    super(props);
    this.state = { transactions: [], loading: true, shortname: '' };
  }

  componentDidMount() {
    this.populateTransactionsList();
  }

  handleChange = event => {
    this.setState({ shortname: event.target.value });
  }

  static renderTransactionsListTable(transactions) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Short Description</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transactionsList =>
            <tr key={transactionsList.id}>
              <td>{transactionsList.shortName}</td>
              <td>{transactionsList.amount}</td>
              <td>{transactionsList.description}</td>
              <td>{transactionsList.transactionDate}</td>
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
        <AddNew></AddNew>
        {contents}
      </div>
    );
  }

  async populateTransactionsList() {
    const response = await fetch('api/Transactions/Get');
    const data = await response.json();
    this.setState({ transactions: data, loading: false });
  }
}
