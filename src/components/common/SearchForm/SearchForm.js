import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

class SearchForm extends Component {
  state = {
    search: '',
  };

  onChange(val, key) {
    this.setState({ [key]: val });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const { search } = this.state;
    return (
      <Form inline onSubmit={e => this.handleSubmit(e)}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="text" name="search" id="search" value={search} onChange={(e) => { this.onChange(e.target.value, 'search'); }} placeholder="Search" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default SearchForm;
