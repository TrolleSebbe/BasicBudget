import React, { Component } from 'react';
import { AddNew } from './AddNew';

export class BudgetList extends Component {
  static displayName = BudgetList.name;

  constructor(props) {
    super(props);
    this.state = { budgetPosts: [], loading: true };
  }

  componentDidMount() {
    this.populateBudgetList();
  }

  static renderBudgetListTable(budgetPosts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Short Description</th>
            <th>Long Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {budgetPosts.map(budgetlist =>
            <tr key={budgetlist.date}>
              <td>{budgetlist.date}</td>
              <td>{budgetlist.shortName}</td>
              <td>{budgetlist.description}</td>
              <td>{budgetlist.amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : BudgetList.renderBudgetListTable(this.state.budgetPosts);

    return (
      <div>
        <h1 id="tabelLabel" >Budgeting</h1>
        <AddNew></AddNew>
        <p>Fetching random data from backend</p>
        {contents}
      </div>
    );
  }

  async populateBudgetList() {
    const response = await fetch('budgetlist');
    const data = await response.json();
    this.setState({ budgetPosts: data, loading: false });
  }
}
