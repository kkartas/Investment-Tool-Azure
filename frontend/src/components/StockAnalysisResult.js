// frontend/src/components/StockAnalysisResult.js

import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Container } from '@mui/material';

const Plot = createPlotlyComponent(Plotly);

function StockAnalysisResult({ data }) {
  console.log('StockAnalysisResult data:', data);

  if (!data || !data.stock_data || !Array.isArray(data.stock_data) || data.stock_data.length === 0) {
    console.log('No stock data available:', data);
    return <div>No stock data available.</div>;
  }

  const { latest_data, recommendation, stock_data } = data;

  const dates = stock_data.map((item) => item.Date);
  const closePrices = stock_data.map((item) => parseFloat(item.Close));
  const sma50 = stock_data.map((item) => parseFloat(item.SMA_50));
  const sma200 = stock_data.map((item) => parseFloat(item.SMA_200));

  return (
    <Container>
      <h2>Analysis Results for {latest_data.Symbol}</h2>
      <Plot
        data={[
          {
            x: dates,
            y: closePrices,
            type: 'scatter',
            mode: 'lines',
            name: 'Close Price',
          },
          {
            x: dates,
            y: sma50,
            type: 'scatter',
            mode: 'lines',
            name: '50-day SMA',
          },
          {
            x: dates,
            y: sma200,
            type: 'scatter',
            mode: 'lines',
            name: '200-day SMA',
          },
        ]}
        layout={{ title: 'Stock Analysis' }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
      <div>
        <h3>Latest Data</h3>
        <ul>
          <li>
            <strong>Latest Close:</strong> ${parseFloat(latest_data.Close).toFixed(2)}
          </li>
          <li>
            <strong>50-day SMA:</strong> ${parseFloat(latest_data.SMA_50).toFixed(2)}
          </li>
          <li>
            <strong>200-day SMA:</strong> ${parseFloat(latest_data.SMA_200).toFixed(2)}
          </li>
          <li>
            <strong>RSI:</strong> {parseFloat(latest_data.RSI).toFixed(2)}
          </li>
          <li>
            <strong>MACD:</strong> {parseFloat(latest_data.MACD).toFixed(2)}
          </li>
          <li>
            <strong>Signal Line:</strong> {parseFloat(latest_data.Signal_Line).toFixed(2)}
          </li>
          <li>
            <strong>Recommendation:</strong> {recommendation}
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default StockAnalysisResult;
