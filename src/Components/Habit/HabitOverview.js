import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { compareDesc } from 'date-fns';
import { Button, Loader } from 'semantic-ui-react';
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
  @media (max-width: 770px) {
    top: 35px;
    right: -185px;
  }
`;

class HabitOverview extends Component {
  state = {
    createInput: false,
    editDate: '',
  };

  toggleCreateInput = date => {
    const { createInput } = this.state;
    this.setState({ createInput: !createInput, editDate: date });
  };

  closeCreateInput = () => {
    if (this.state.createInput === true) {
      this.setState({ createInput: false, editDate: '' });
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
          if (loading) return <Loader active />;
          if (error) {
            console.log(error);
            return <p style={{ marginTop: '3em' }}>Error :( Try refreshing the page!</p>;
          }

          if (data) {
            const { habit } = data;
            const { editDate } = this.state;
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
                      editDate={editDate}
                    />
                  ) : (
                    ''
                  )}
                  <HabitTable
                    name={habit.name}
                    unit={habit.unit}
                    data={sortedData}
                    goal={habit.goal}
                    direction={habit.direction}
                    openEdit={this.toggleCreateInput}
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
