import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { Formik } from 'formik';
import { Card, CardContent, Form, Button, Modal } from 'semantic-ui-react';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { createDateOptions } from './utils';

const dateOptions = createDateOptions();

const CREATE_INPUT = gql`
  mutation createInputForHabit($habitId: ID!, $amount: Float!, $date: DateTime!) {
    createInputForHabit(habitId: $habitId, amount: $amount, date: $date) {
      id
      amount
      date
    }
  }
`;

const TEST = gql`
  mutation {
    createInputForHabit(habitId: "cjnq8c46u003n09921zho157m", amount: 12, date: "2018-10-12") {
      id
      amount
      date
    }
  }
`;

class NewInput extends Component {
  handleSubmit = client => async ({ date, amount }, { setSubmitting }) => {
    setSubmitting(true);
    const { habitId, refetchInputs, close } = this.props;
    amount = Number(amount);
    const res = await client.mutate({
      mutation: CREATE_INPUT,
      variables: { habitId, amount, date },
    });
    console.log(res);
    close();
    refetchInputs();
    setSubmitting(false);
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Formik
            initialValues={{
              date: format(Date.now(), 'YYYY-MM-DD'),
              amount: 0,
            }}
            onSubmit={this.handleSubmit(client)}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              mapPropsToValues,
            }) => {
              return (
                <Modal
                  open={this.props.open}
                  onClose={this.props.close}
                  onClick={e => e.stopPropagation()}
                  size="small"
                  style={{ textAlign: 'center' }}
                >
                  <Modal.Header>Add your daily progress</Modal.Header>
                  <Modal.Content>
                    <Form size="small" onSubmit={handleSubmit} widths="equal" unstackable>
                      <Form.Field>
                        <select
                          label="Date"
                          name="date"
                          value={values.date}
                          onChange={handleChange}
                        >
                          {dateOptions.map(e => e)}
                        </select>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          min={0}
                          max={10000}
                          name="amount"
                          label="Amount"
                          value={values.amount}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Button disabled={isSubmitting} type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Modal.Content>
                </Modal>
              );
            }}
          </Formik>
        )}
      </ApolloConsumer>
    );
  }
}

export default NewInput;
