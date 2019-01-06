import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import './ContactForm.scss';

class ContactForm extends Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Input bsSize="lg" type="text" name="name" id="contactName" placeholder="Name" />
        </FormGroup>
        <FormGroup>
          <Input bsSize="lg" type="email" name="email" id="conatctEmail" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Input bsSize="lg" type="text" name="phone" id="contactPhone" placeholder="Phone Number" />
        </FormGroup>
        <FormGroup>
          <Input bsSize="lg" rows="6" type="textarea" name="message" id="contactMessage" placeholder="Message" />
        </FormGroup>
        
        <Button outline block color="light">SUBMIT</Button>
      </Form>
    )
  } 
}

export default ContactForm;
