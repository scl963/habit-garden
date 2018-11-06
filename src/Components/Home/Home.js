import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Loader } from 'semantic-ui-react';
import styled from 'react-emotion';
import { getUserId } from '../../utils/AuthUtils';
import OverviewTable from './OverviewTable';
import OverviewChart from './OverviewChart';
import CreateHabit from './CreateHabit';
import { format, subDays } from 'date-fns';
import { GenericContainer } from '../Styles';

const lastWeek = format(subDays(Date.now(), 7), 'YYYY-MM-DD');

const GET_USER_DATA = gql`
  query User($userId: ID!, $start: DateTime!) {
    user(userId: $userId) {
      id
      firstName
      habits {
        id
        name
        updatedAt
        inputs(where: { date_gt: $start }, orderBy: date_ASC) {
          id
          amount
          date
        }
      }
    }
  }
`;

const ButtonContainer = styled('div')`
  position: relative;
  top: 47px;
  right: -400px;
  @media (max-width: 770px) {
    width: 42px;
    height: 42px;
    top: 50px;
    right: -355px;
  }
`;

class Home extends Component {
  state = {
    userId: getUserId(),
    createHabit: false,
  };

  toggleCreateHabit = () => {
    const { createHabit } = this.state;
    this.setState({ createHabit: !createHabit });
  };

  render() {
    const { userId, createHabit } = this.state;
    return (
      <Query query={GET_USER_DATA} variables={{ userId: userId, start: lastWeek }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loader active />;
          if (error) {
            console.log(error);
            return <p style={{ marginTop: '3em' }}>Error :( Try refreshing the page</p>;
          }

          if (data) {
            const { user } = data;
            const sortedHabits = user.habits.sort();
            return (
              <div>
                <GenericContainer>
                  {sortedHabits.length ? (
                    <div>
                      <OverviewChart data={sortedHabits} />
                      <OverviewTable
                        habits={sortedHabits}
                        toggleCreateHabit={this.toggleCreateHabit}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2>You aren't tracking any habits yet</h2>
                      <ButtonContainer>
                        <Button
                          positive
                          circular
                          size="large"
                          icon="plus"
                          onClick={this.toggleCreateHabit}
                        />
                      </ButtonContainer>
                    </div>
                  )}
                  {createHabit ? (
                    <CreateHabit
                      open={createHabit}
                      close={this.toggleCreateHabit}
                      refetchHabits={refetch}
                    />
                  ) : (
                    ''
                  )}
                </GenericContainer>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default Home;
