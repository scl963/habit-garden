import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { parse } from 'date-fns';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { GenericContainer } from '../Styles';

class OverviewTable extends Component {
  state = {};

  render() {
    const { habits } = this.props;
    return (
      <GenericContainer>
        <h1>My Habits</h1>
        <Table textAlign="center" fixed selectable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Last Activity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {habits.map(habit => {
              const { id, name, updatedAt } = habit;
              const parsedDate = parse(updatedAt).toDateString();
              return (
                <Table.Row
                  selectable
                  cellAs={Link}
                  key={name}
                  to={{ pathname: `/habit/${name}`, state: { habitId: id } }}
                >
                  <Table.Cell selectable>
                    <Link to={{ pathname: `/habit/${name}`, state: { habitId: id } }}>{name}</Link>
                  </Table.Cell>
                  <Table.Cell selectable>
                    <Link to={{ pathname: `/habit/${name}`, state: { habitId: id } }}>
                      {parsedDate}
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </GenericContainer>
    );
  }
}

export default OverviewTable;
