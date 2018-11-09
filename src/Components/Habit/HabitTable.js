import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { goalReached } from './utils';
import { customFormat } from '../../utils/DateUtils';

const HabitTable = props => {
  return (
    <Table textAlign="center" selectable unstackable>
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell colSpan="3">
            <h1 style={{ textAlign: 'center', paddingLeft: '33px' }}>
              {props.name} Activity Log
              <Button
                positive
                style={{ verticalAlign: 'text-top', float: 'right' }}
                circular
                size="small"
                icon="plus"
                onClick={props.createInput}
              />
            </h1>
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
              <Table.Row
                key={input.date}
                style={{ cursor: 'pointer' }}
                onClick={() => props.openEdit(customFormat(input.date, 'YYYY-MM-DD'))}
              >
                <Table.Cell>{customFormat(input.date, 'MMM DD YY')}</Table.Cell>
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
