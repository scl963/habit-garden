import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

class NewInput extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Input />
        </Form.Field>
      </Form>
    );
  }
}

export default NewInput;
