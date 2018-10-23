import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import NewInput from './NewInput';
import { GenericContainer } from '../Styles';
import styled from 'react-emotion';

const HabitForm = styled('div')`
  width: 100%;
  margin: 0 auto !important;
`;

const HABIT_QUERY = gql`
  query Habit($habitId: ID!) {
    habit(habitId: $habitId) {
      id
      name
      inputs {
        id
        amount
        date
      }
    }
  }
`;

class HabitOverview extends Component {
  render() {
    const { habitId } = this.props.location.state;
    return (
      <Query query={HABIT_QUERY} variables={{ habitId: habitId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error);
            return <p>Error :(</p>;
          }

          if (data) {
            console.log(data);
            return (
              <GenericContainer>
                <HabitForm>
                  <NewInput />
                </HabitForm>
              </GenericContainer>
            );
          }
        }}
      </Query>
    );
  }
}

export default HabitOverview;
