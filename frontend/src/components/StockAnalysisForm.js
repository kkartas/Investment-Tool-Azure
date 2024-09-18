// frontend/src/components/StockAnalysisForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

function StockAnalysisForm({ onResult }) {
  const [stockSymbol, setStockSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/stock-analysis', {
        stock_symbol: stockSymbol,
        start_date: startDate,
        end_date: endDate,
      });
      onResult(response.data);
    } catch (error) {
      console.error('API Error:', error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Container>
      <h2>Stock Analysis</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Stock Symbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Analyze Stock
        </Button>
      </form>
    </Container>
  );
}

export default StockAnalysisForm;
