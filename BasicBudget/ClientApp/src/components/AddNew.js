import React from 'react';
import {
    Button,
    Collapse,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
class AddNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            shortName: '',
            description: '',
            amount: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this); //this allows handleSubmit to access "this"
    }

    handleSubmit(event) {
        this.setState({ isOpen: false });
        event.preventDefault();
        //Generate json object
        let jsonObject = {};
        jsonObject["shortName"] = this.state.shortName;
        jsonObject["description"] = this.state.description;
        jsonObject["amount"] = parseInt(this.state.amount, 10);
        //Do POST request
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => { //this triggers when the call is finished
            if (xhr.readyState === 4 && xhr.status === 200) {
                //we run onAddNew when we get a response, returning the new item
                this.props.onAddNew(JSON.parse(xhr.responseText));
            }
        }
        xhr.open('POST', '/api/transactions/addtransaction', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(jsonObject));

        //Clean form from data
        this.setState({shortName: ''});
        this.setState({description: ''});
        this.setState({amount: ''});
    }

    render() {
        return (
            <div>
                <Button
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })} //it felt like the toggle didnt need to be a "real" function
                    color="primary"
                    id="toggler"
                    style={{
                    marginBottom: '1rem'
                }}>Add New Bugetpost</Button>
                <Collapse isOpen={this.state.isOpen}>
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
                                        placeholder="Add a short description of the budgetpost"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Description">Description</Label>
                                    <Input
                                        onChange={(event) => this.setState({description: event.currentTarget.value})}
                                        value={this.state.description}
                                        type="textarea"
                                        name="description"
                                        id="Description"
                                        placeholder="Add a description of the budgetpost"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Amount">Amount</Label>
                                    <Input
                                        onChange={(event) => this.setState({amount: event.currentTarget.value})}
                                        value={this.state.amount}
                                        type="number"
                                        name="amount"
                                        id="Amount"
                                        placeholder="Add a Amount for budgetPost"/>
                                </FormGroup>
                                <Button color="primary" id="submit" type="submit">Submit new post</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export { AddNew };