import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { getUserId } from '../../utils/AuthUtils';
import styled from 'react-emotion';
import OverviewTable from './OverviewTable';
import OverviewChart from './OverviewChart';

const GET_USER_DATA = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      firstName
      habits {
        id
        name
        updatedAt
        inputs(last: 7, orderBy: date_ASC) {
          id
          amount
          date
        }
      }
    }
  }
`;

const HomeContainer = styled('div')`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Home extends Component {
  state = {
    userId: getUserId(),
  };

  componentDidMount() {
    console.log('Hello');
  }

  render() {
    const { userId } = this.state;
    return (
      <Query query={GET_USER_DATA} variables={{ userId: userId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error);
            return <p>Error :(</p>;
          }

          if (data) {
            console.log(data);
            const { user } = data;
            const { habits } = user;
            return (
              <div>
                {habits.length ? (
                  <HomeContainer>
                    <OverviewChart data={habits} />
                    <OverviewTable habits={habits} />
                  </HomeContainer>
                ) : (
                  <div>You aren't tracking any habits yet</div>
                )}
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default Home;
