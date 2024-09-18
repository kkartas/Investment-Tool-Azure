// frontend/src/components/DcaCalculatorForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, MenuItem } from '@mui/material';

function DcaCalculatorForm({ onResult }) {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [periodicInvestment, setPeriodicInvestment] = useState('');
  const [period, setPeriod] = useState('weekly');
  const [years, setYears] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/dca-calculation', {
        initial_investment: parseFloat(initialInvestment),
        periodic_investment: parseFloat(periodicInvestment),
        period: period,
        years: parseInt(years),
        annual_return: parseFloat(annualReturn),
      });
      onResult(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Container>
      <h2>DCA Calculator</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Initial Investment ($)"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          required
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Periodic Investment ($)"
          value={periodicInvestment}
          onChange={(e) => setPeriodicInvestment(e.target.value)}
          required
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Investment Frequency"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </TextField>
        <TextField
          label="Investment Duration (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          required
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Expected Annual Return (%)"
          value={annualReturn}
          onChange={(e) => setAnnualReturn(e.target.value)}
          required
          fullWidth
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" color="secondary">
          Calculate DCA
        </Button>
      </form>
    </Container>
  );
}

export default DcaCalculatorForm;
