import React, {Component} from 'react';
import {AddNew} from './AddNew';
import {DeleteOne} from './DeleteOne';
import {EditOne} from './EditOne';
import {
    Table,
    ButtonGroup,
  } from 'reactstrap';

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
        //This code only removed the specific transaction from the array
        let transactions = this.state.transactions;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].id === removedTransaction.id) {
                transactions.splice(i, 1);
            }
        }
        this.setState({ transactions: transactions });
        // The code below gets the full list
        // this.populateTransactionsList();
        // this.renderTransactionsListTable(this.state.transactions);
    }

    renderTransactionsListTable(transactions) {
        return (
            <Table hover>
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
                        <td>
                        <ButtonGroup>
                            <DeleteOne transaction ={ currentTransaction } onDeleteOne={(removedTransaction) => {this.handleDeleteOne(removedTransaction)}}></DeleteOne>
                            <EditOne transaction ={ currentTransaction }></EditOne>
                        </ButtonGroup>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
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