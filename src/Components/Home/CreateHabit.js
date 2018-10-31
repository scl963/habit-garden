import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { Formik } from 'formik';
import { Card, CardContent, Form, Button, Modal } from 'semantic-ui-react';
import * as Yup from 'yup';

const CREATE_HABIT = gql`
  mutation CreateHabit($name: String!, $goal: Int!, $unit: String!, $direction: Direction!) {
    createHabitForUser(name: $name, goal: $goal, unit: $unit, direction: $direction) {
      id
      name
      goal
      unit
      direction
    }
  }
`;

const HabitSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
  goal: Yup.number()
    .required()
    .positive()
    .integer(),
  unit: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});

class CreateHabit extends Component {
  handleSubmit = client => async ({ name, goal, unit, direction }, { setSubmitting }) => {
    setSubmitting(true);
    const res = await client.mutate({
      mutation: CREATE_HABIT,
      variables: { name, goal, unit, direction },
    });
    this.props.refetchHabits();
    this.props.close();
    setSubmitting(false);
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Formik
            initialValues={{
              name: '',
              goal: 0,
              unit: '',
              direction: 'Increase',
            }}
            validationSchema={HabitSchema}
            validateOnChange={true}
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
                  size="tiny"
                  style={{ textAlign: 'center' }}
                  onClick={e => e.stopPropagation()}
                  onClose={this.props.close}
                  closeOnDimmerClick={true}
                  closeOnDocumentClick={true}
                  closeOnEscape={true}
                >
                  <Modal.Header>Create a New Habit</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={handleSubmit} widths="equal" unstackable size="large">
                      <Form.Field>
                        <Form.Input
                          maxLength="40"
                          name="name"
                          label="Habit Name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          min="0"
                          max="10000"
                          name="goal"
                          label="Goal Amount"
                          value={values.goal}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          name="unit"
                          maxLength="40"
                          label="Units"
                          value={values.unit}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label style={{ fontWeight: 'bold' }}>Direction</label>
                        <select name="direction" value={values.direction} onChange={handleChange}>
                          <option key="increase" name="increase" value="Increase">
                            Increase
                          </option>
                          <option key="decrease" name="decrease" value="Decrease">
                            Decrease
                          </option>
                        </select>
                      </Form.Field>
                      <Button disabled={isSubmitting} type="submit">
                        Create!
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

export default CreateHabit;
