import React, { Component } from 'react';
import { Button, UncontrolledCollapse, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
export class AddNew extends Component {


    addNew(event) {
      console.log('I worked')
      event.preventDefault()
      const data = new FormData(event.target);
      let jsonObject = {};
      for (const [key, value]  of data.entries()) { jsonObject[key] = value; }
      let json = JSON.stringify(jsonObject);
      console.log(json);
      fetch('/api/transactions/addtransaction', {
        method: 'POST',
        body: json,
      });
      /* var xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/transactions/addtransaction')
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.send(JSON.stringify({ shortName: "test" }))
      console.log(JSON.stringify({shortName: "test"})) */
    }

    render() {
    return (
      <div>
           <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>Add New Bugetpost</Button>
    <UncontrolledCollapse toggler="#toggler">
      <Card>
        <CardBody>
          <Form onSubmit={this.addNew}>
              <FormGroup>
                  <Label for="Name">Name</Label>
                  <Input type="text" name="shortName" id="Name" placeholder="Add a short description of the budgetpost" />
              </FormGroup>
              <FormGroup>
                  <Label for="Description">Description</Label>
                  <Input type="textarea" name="description" id="Description" placeholder="Add a description of the budgetpost" />
              </FormGroup>
{/*               <FormGroup>
                  <Label for="Amount">Amount</Label>
                  <Input type="number" name="amount" id="Amount" placeholder="Add a Amount for budgetPost" />
              </FormGroup> */}
              <Button color="primary" id="submit" type="submit">Submit new post</Button>
          </Form>
          
        </CardBody>
      </Card>
    </UncontrolledCollapse>
      </div>
    );
  }
}
// Date = DateTime.Now.AddDays(index),
//     ShortName = "TrolleBolle",
//     Description = "Trolle testar stenhårt",
//     Amount = randomizationVariable.Next(-1000, 1000)