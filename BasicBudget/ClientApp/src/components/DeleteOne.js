import React from 'react';
import {
  Button,
} from 'reactstrap';

class DeleteOne extends React.Component {

  constructor(props) {
      super(props);
      this.handleDeleteOne = this.handleDeleteOne.bind(this);
  }

  handleDeleteOne() {
    //Delete from db
    console.log(JSON.stringify(this.props.transaction));
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/transactions/deletetransaction');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(this.props.transaction));
    this.props.onDeleteOne(this.props.transaction);
  }

  render() {
    //we must pass () => method to avoid the trigger on render
    return (
      <div>
        <Button color="danger" onClick={() => {this.handleDeleteOne()} }>Delete</Button>
      </div>
    )
  }
}

export { DeleteOne };