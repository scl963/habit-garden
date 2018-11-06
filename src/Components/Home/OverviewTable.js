import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { parse } from 'date-fns';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { GenericContainer } from '../Styles';

const OverviewTable = props => {
  const { habits } = props;
  return (
    <GenericContainer>
      <Table textAlign="center" fixed selectable striped unstackable>
        <Table.Header fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan="2">
              <h1 style={{ textAlign: 'center' }}>
                My Habits{' '}
                <Button
                  positive
                  style={{ verticalAlign: 'text-top', float: 'right' }}
                  circular
                  size="small"
                  icon="plus"
                  onClick={props.toggleCreateHabit}
                />
              </h1>
            </Table.HeaderCell>
          </Table.Row>
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
};

export default OverviewTable;
