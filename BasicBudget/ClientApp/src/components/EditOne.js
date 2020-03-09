import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
} from 'reactstrap';

class EditOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      shortName: '',
      description: '',
      amount: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({
      isOpen: true,
      shortName: this.props.transaction.shortName,
      description: this.props.transaction.description,
      amount: this.props.transaction.amount,
    });
  }

  handleSubmit() {
    console.log("submitted...");
    this.setState({isOpen: false});
  }

  render() {
    return (
      <div className="EditOne">
        <Button outline color="secondary" onClick={() => { this.handleOpen() }}>🖊️</Button>
        <Modal isOpen={this.state.isOpen}>
          <Card>
              <CardBody>
                  <Form onSubmit={(event) => {this.handleSubmit(event)} }>
                      <FormGroup>
                          <Label for="Name">Name</Label>
                          <Input
                              onChange={(event) => this.setState({shortName: event.currentTarget.value})}
                              value={this.state.shortName}
                              type="text"
                              name="shortName"
                              id="Name"
                              placeholder="Edit name"/>
                      </FormGroup>
                      <FormGroup>
                          <Label for="Description">Description</Label>
                          <Input
                              onChange={(event) => this.setState({description: event.currentTarget.value})}
                              value={this.state.description}
                              type="textarea"
                              name="description"
                              id="Description"
                              placeholder="Edit description"/>
                      </FormGroup>
                      <FormGroup>
                          <Label for="Amount">Amount</Label>
                          <Input
                              onChange={(event) => this.setState({amount: event.currentTarget.value})}
                              value={this.state.amount}
                              type="number"
                              name="amount"
                              id="Amount"
                              placeholder="Edit amount"/>
                      </FormGroup>
                      <Button outline color="primary" id="submit" type="submit">Save changes</Button>
                      <Button outline color="secondary" id="cancel" onClick={() => this.setState({ isOpen: false })}>Cancel</Button>
                  </Form>
              </CardBody>
          </Card>
        </Modal>
      </div>
    )
  }
}

export { EditOne };