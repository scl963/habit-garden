import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { parse, format } from 'date-fns';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { GenericContainer } from '../Styles';
import { goalReached } from './utils';

const HabitTable = props => {
  return (
    <Table textAlign="center" selectable unstackable>
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell colSpan="3">
            <h1 style={{ textAlign: 'center' }}>{props.name} Activity Log</h1>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>{props.unit} Logged</Table.HeaderCell>
          <Table.HeaderCell>Goal Reached</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.data ? (
          props.data.map(input => {
            const isGoalReached = goalReached(input.amount, props.goal, props.direction);
            return (
              <Table.Row>
                <Table.Cell>{format(input.date, 'MMM DD YY')}</Table.Cell>
                <Table.Cell>{input.amount}</Table.Cell>
                <Table.Cell positive={isGoalReached} negative={!isGoalReached}>
                  {isGoalReached ? <Icon name="checkmark" /> : <Icon name="x" />}
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            You haven't logged any data for this activity yet! Click the plus sign to record your
            daily activity.
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default HabitTable;
