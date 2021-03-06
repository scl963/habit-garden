import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'react-emotion';
import { customFormat } from '../../utils/DateUtils';

const ChartContainer = styled('div')`
  height: 300px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

class HabitChart extends Component {
  state = {
    tableData: [],
  };

  formatTableData(habit) {
    const { inputs, name } = habit;
    const data = inputs.map(({ date, amount }) => {
      const newDate = customFormat(date, 'YYYY-MM-DD');
      return { x: newDate, y: amount };
    });
    return { id: name, data };
  }

  componentDidMount() {
    const { data } = this.props;
    const tableData = this.formatTableData(data);
    this.setState({ tableData: [tableData] });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { data } = this.props;
      const tableData = this.formatTableData(data);
      this.setState({ tableData: [tableData] });
    }
  }

  render() {
    const { tableData } = this.state;
    return tableData.length && tableData[0].data.length ? (
      <ChartContainer>
        <ResponsiveLine
          data={tableData}
          lineWidth={15}
          colors="category10"
          margin={{
            top: 20,
            right: 30,
            bottom: 50,
            left: 30,
          }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
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
          dotSize={15}
          dotColor="inherit:darker(0.3)"
          dotBorderWidth={2}
          dotBorderColor="#ffffff"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={{ tooltip: { container: { background: '#d8cdf4' } } }}
        />
      </ChartContainer>
    ) : (
      <div />
    );
  }
}

export default HabitChart;
