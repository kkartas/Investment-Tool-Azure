// frontend/src/components/DcaCalculationResult.js

import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Container } from '@mui/material';

const Plot = createPlotlyComponent(Plotly);

function DcaCalculationResult({ data }) {
  if (!data || !data.data_points || !Array.isArray(data.data_points.dates)) {
    return <div>No DCA calculation data available.</div>;
  }

  const { total_invested, future_value, total_profit, data_points } = data;
  const dates = data_points.dates;
  const invested = data_points.invested.map((val) => parseFloat(val));
  const value = data_points.value.map((val) => parseFloat(val));

  return (
    <Container>
      <h2>DCA Calculation Results</h2>
      <ul>
        <li>
          <strong>Total Invested:</strong> ${total_invested.toFixed(2)}
        </li>
        <li>
          <strong>Future Value:</strong> ${future_value.toFixed(2)}
        </li>
        <li>
          <strong>Total Profit:</strong> ${total_profit.toFixed(2)}
        </li>
      </ul>
      <Plot
        data={[
          {
            x: dates,
            y: invested,
            type: 'scatter',
            mode: 'lines',
            name: 'Total Invested',
          },
          {
            x: dates,
            y: value,
            type: 'scatter',
            mode: 'lines',
            name: 'Portfolio Value',
          },
        ]}
        layout={{ title: 'DCA Investment Growth' }}
        style={{ width: '100%', height: '100%' }}
      />
    </Container>
  );
}

export default DcaCalculationResult;
