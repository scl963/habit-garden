import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'react-emotion';
import { getDateFromISO } from './utils';

const ChartContainer = styled('div')`
  height: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

class OverviewChart extends Component {
  state = {
    tableData: [],
  };

  formatTableData(data) {
    const allInputs = data.map(habit => {
      const { inputs } = habit;
      const data = inputs.map(({ date, amount }) => {
        const newDate = getDateFromISO(date);
        return { x: newDate, y: amount };
      });
      return { id: habit.name, data };
    });
    return allInputs;
  }

  componentDidMount() {
    const { data } = this.props;
    const tableData = this.formatTableData(data);
    this.setState({ tableData });
  }

  render() {
    const { tableData } = this.state;
    return tableData.length ? (
      <div>
        <h1>Progress this week</h1>
        <ChartContainer>
          <ResponsiveLine
            data={tableData}
            margin={{
              top: 20,
              right: 10,
              bottom: 50,
              left: 30,
            }}
            xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'day',
            }}
            yScale={{
              type: 'linear',
              stacked: false,
              min: '0',
              max: 'auto',
            }}
            minY="auto"
            maxY="auto"
            stacked={true}
            curve="monotoneX"
            axisBottom={{
              format: '%b %d',
              orient: 'bottom',
              tickSize: 5,
              tickValues: 7,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Date',
              legendOffset: 36,
              legendPosition: 'center',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Amount',
              legendOffset: -40,
              legendPosition: 'center',
            }}
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={true}
            dotLabel="y"
            dotLabelYOffset={-12}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </ChartContainer>
      </div>
    ) : (
      <div />
    );
  }
}

export default OverviewChart;
