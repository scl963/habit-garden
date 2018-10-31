import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { compareDesc } from 'date-fns';
import { Button } from 'semantic-ui-react';
import { GenericContainer } from '../Styles';
import HabitChart from './HabitChart';
import NewInput from './NewInput';
import HabitTable from './HabitTable';
import StatsPanel from './StatsPanel';
import styled from 'react-emotion';

const HABIT_QUERY = gql`
  query Habit($habitId: ID!) {
    habit(habitId: $habitId) {
      id
      name
      best {
        id
        date
        amount
      }
      average
      unit
      goal
      direction
      inputs(orderBy: date_ASC) {
        id
        amount
        date
      }
    }
  }
`;

const ButtonContainer = styled('div')`
  position: relative;
  top: 35px;
  right: -400px;
  @media (max-width: 760px) {
    top: 35px;
    right: -185px;
  }
`;

class HabitOverview extends Component {
  state = {
    createInput: false,
  };

  toggleCreateInput = () => {
    const { createInput } = this.state;
    this.setState({ createInput: !createInput });
  };

  closeCreateInput = () => {
    if (this.state.createInput === true) {
      this.setState({ createInput: false });
    } else {
      return;
    }
  };

  render() {
    const { createInput } = this.state;
    const { habitId } = this.props.location.state;
    return (
      <Query query={HABIT_QUERY} variables={{ habitId: habitId }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error);
            return <p>Error :(</p>;
          }

          if (data) {
            console.log(data);
            const { habit } = data;
            const sortedData = habit.inputs.sort((a, b) => compareDesc(a.date, b.date));
            return (
              <div onClick={this.closeCreateInput} style={{ marginBottom: '2em' }}>
                <GenericContainer>
                  <h1>{habit.name}</h1>
                  <HabitChart data={habit} />
                  <StatsPanel
                    best={habit.best}
                    average={habit.average}
                    goal={habit.goal}
                    direction={habit.direction}
                    unit={habit.unit}
                  />
                  {createInput ? (
                    <NewInput
                      habitId={habitId}
                      refetchInputs={refetch}
                      open={createInput}
                      close={this.closeCreateInput}
                    />
                  ) : (
                    ''
                  )}
                  <div>
                    <ButtonContainer>
                      <Button
                        positive
                        circular
                        size="large"
                        icon="plus"
                        onClick={this.toggleCreateInput}
                      />
                    </ButtonContainer>
                  </div>
                  <HabitTable
                    name={habit.name}
                    unit={habit.unit}
                    data={sortedData}
                    goal={habit.goal}
                    direction={habit.direction}
                  />
                </GenericContainer>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default HabitOverview;
