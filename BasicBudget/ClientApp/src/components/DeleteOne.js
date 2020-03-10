import React from 'react';
import {
  Button,
} from 'reactstrap';
import Emoji from './Emoji';

class DeleteOne extends React.Component {

  constructor(props) {
      super(props);
      this.handleDeleteOne = this.handleDeleteOne.bind(this);
  }

  handleDeleteOne() {
    //Delete from db
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => { //this triggers when the call is finished
      if (xhr.readyState === 4 && xhr.status === 200) {
          //we run onDeleteOne when we get a response
          this.props.onDeleteOne(this.props.transaction);
      }
    }
    xhr.open('DELETE', '/api/transactions/deletetransaction');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(this.props.transaction));
  }

  render() {
    //we must pass () => method to avoid the trigger on render
    return (
      <div>
          <Button outline color="danger" onClick={() => {this.handleDeleteOne()} }><Emoji symbol="🗑️"></Emoji></Button>
      </div>
    )
  }
}

export { DeleteOne };