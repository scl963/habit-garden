import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import { format } from 'date-fns';
import styled from 'react-emotion';

const StatsContainer = styled('div')`
  color: white !important;
  background-color: black;
  display: flex !important;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 0.4em;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  @media (max-width: 800px) {
    flex-direction: column !important;
    justify-content: auto;
    align-items: center;
    margin-bottom: 1.5em;
  }
`;

const StatsPanel = props => {
  return (
    <StatsContainer>
      <Statistic inverted>
        <Statistic.Value>{format(props.best.date, 'MM/DD')}</Statistic.Value>
        <Statistic.Label>Best Day</Statistic.Label>
      </Statistic>
      <Statistic inverted>
        <Statistic.Value>{props.best.amount}</Statistic.Value>
        <Statistic.Label>
          {props.direction === 'Increase' ? `Most ${props.unit}` : `Least ${props.unit}`}
        </Statistic.Label>
      </Statistic>
      <Statistic inverted>
        <Statistic.Value>{props.goal}</Statistic.Value>
        <Statistic.Label>Daily Goal</Statistic.Label>
      </Statistic>
      <Statistic inverted>
        <Statistic.Value>{props.average.toFixed(2)}</Statistic.Value>
        <Statistic.Label>Daily Average</Statistic.Label>
      </Statistic>
    </StatsContainer>
  );
};

export default StatsPanel;
