import React, {Component} from 'react';
import {
    Button,
    UncontrolledCollapse,
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
        };
        this.handleSubmit = this.handleSubmit.bind(this); //this allows handleSubmit to access "this"
    }

    handleSubmit(event) {
        console.log('I worked')
        this.setState({ isOpen: false });
        event.preventDefault()
        //Get formdata from form
        const data = new FormData(event.target);
        //Generate json object
        let jsonObject = {};
        jsonObject["shortName"] = data.get("shortName");
        jsonObject["description"] = data.get("description");
        jsonObject["amount"] = parseInt(data.get("amount"), 10);
        //Do POST request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/transactions/addtransaction');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(jsonObject));
        console.log(JSON.stringify(jsonObject));
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
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="Name">Name</Label>
                                    <Input
                                        type="text"
                                        name="shortName"
                                        id="Name"
                                        placeholder="Add a short description of the budgetpost"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Description">Description</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="Description"
                                        placeholder="Add a description of the budgetpost"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Amount">Amount</Label>
                                    <Input
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