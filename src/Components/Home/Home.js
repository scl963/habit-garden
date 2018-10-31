import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import styled from 'react-emotion';
import { getUserId } from '../../utils/AuthUtils';
import OverviewTable from './OverviewTable';
import OverviewChart from './OverviewChart';
import CreateHabit from './CreateHabit';
import { format, subDays } from 'date-fns';
import { GenericContainer } from '../Styles';

const lastWeek = format(subDays(Date.now(), 7), 'YYYY-MM-DD');

console.log(lastWeek);

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
  top: 28px;
  right: -400px;
  @media (max-width: 760px) {
    width: 42px;
    height: 42px;
    top: 19px;
    right: -355px;
  }
`;

class Home extends Component {
  state = {
    userId: getUserId(),
    createHabit: false,
  };

  componentDidMount() {
    console.log('Hello');
  }

  toggleCreateHabit = () => {
    const { createHabit } = this.state;
    this.setState({ createHabit: !createHabit });
  };

  render() {
    const { userId, createHabit } = this.state;
    return (
      <Query query={GET_USER_DATA} variables={{ userId: userId, start: lastWeek }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error);
            return <p>Error :(</p>;
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
                      <div>
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
                      <OverviewTable habits={sortedHabits} />
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
