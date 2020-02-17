import React, { Component } from 'react';

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
          </tr>
        </thead>
        <tbody>
          {transactions.map(transactionsList =>
            <tr key={transactionsList.shortName}>
              <td>{transactionsList.shortName}</td>
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
        <React.Fragment>
          <form>
            <label htmlFor="ShortName">Shortname: </label>
            <input
              type="text"
              name="shortname"
              value={this.state.shortname}
              onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
          <h3>Text entered: {this.state.shortname}</h3>
        </React.Fragment>
        {contents}
      </div>
    );
  }

  async populateTransactionsList() {
    const response = await fetch('transactions');
    const data = await response.json();
    this.setState({ transactions: data, loading: false });
  }
}
