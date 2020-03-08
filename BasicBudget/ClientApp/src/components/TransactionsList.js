import React, {Component} from 'react';
import {AddNew} from './AddNew';
import {DeleteOne} from './DeleteOne';

class TransactionsList extends Component {
    static displayName = TransactionsList.name;

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            loading: true,
            totalTransactions: 0,
        };
        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleDeleteOne = this.handleDeleteOne.bind(this);
    }

    componentDidMount() {
        this.populateTransactionsList();
    }

    handleAddNew(newTransaction) {
        // Solution to only add new transaction to list (lightweight)
        let transactions = this.state.transactions;
        transactions.push(newTransaction);
        this.setState({ transactions: transactions });
        // Solution to get full accurate list every time (heavier?)
        // this.populateTransactionsList();
        //this.renderTransactionsListTable(this.state.transactions);
    }

    handleDeleteOne(removedTransaction) {
        this.populateTransactionsList();
        this.renderTransactionsListTable(this.state.transactions);
    }

    renderTransactionsListTable(transactions) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Short Description</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(currentTransaction => <tr key={currentTransaction.id}>
                        <td>{currentTransaction.shortName}</td>
                        <td>{currentTransaction.amount}</td>
                        <td>{currentTransaction.description}</td>
                        <td>{currentTransaction.transactionDate}</td>
                        <td><DeleteOne transaction ={ currentTransaction } onDeleteOne={() => {this.handleDeleteOne()}}></DeleteOne></td>
                    </tr>)}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p>
                    <em>Loading...</em>
                </p>
            : this.renderTransactionsListTable(this.state.transactions);

        return (
            <div>
                <h1 id="tabelLabel">Transactions</h1>
                <p>Fetching from MongoDb</p>
                <AddNew onAddNew={(newTransaction) => {this.handleAddNew(newTransaction)} }></AddNew>
                {contents}
            </div>
        );
    }

    async populateTransactionsList() {
        const response = await fetch('api/Transactions/Get');
        const data = await response.json();
        this.setState({transactions: data, loading: false});
    }
}

export { TransactionsList };