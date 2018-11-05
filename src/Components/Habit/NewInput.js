import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { Formik } from 'formik';
import { Form, Button, Modal } from 'semantic-ui-react';
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

const NewInput = props => {
  const handleSubmit = client => async ({ date, amount }, { setSubmitting }) => {
    setSubmitting(true);
    const { habitId, refetchInputs, close } = props;
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

  const editDate = props.editDate.length ? props.editDate : null;

  return (
    <ApolloConsumer>
      {client => (
        <Formik
          initialValues={{
            date: editDate || format(Date.now(), 'YYYY-MM-DD'),
            amount: 0,
          }}
          onSubmit={handleSubmit(client)}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
            return (
              <Modal
                open={props.open}
                onClose={props.close}
                onClick={e => e.stopPropagation()}
                size="tiny"
                style={{ textAlign: 'center' }}
              >
                <Modal.Header>
                  {editDate ? 'Edit your past activity' : 'Add your daily progress'}
                </Modal.Header>
                <Modal.Content>
                  <Form size="huge" onSubmit={handleSubmit} widths="equal" unstackable>
                    {editDate ? (
                      <h3>{editDate}</h3>
                    ) : (
                      <Form.Field>
                        <label>Date</label>
                        <select name="date" value={values.date} onChange={handleChange}>
                          {dateOptions.map(e => e)}
                        </select>
                      </Form.Field>
                    )}
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
};

export default NewInput;
