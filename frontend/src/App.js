// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockAnalysisForm from './components/StockAnalysisForm';
import DcaCalculatorForm from './components/DcaCalculatorForm';
import StockAnalysisResult from './components/StockAnalysisResult';
import DcaCalculationResult from './components/DcaCalculationResult';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

function App() {
  const [stockAnalysisData, setStockAnalysisData] = useState(null);
  const [dcaCalculationData, setDcaCalculationData] = useState(null);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Investment Analysis Tool</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <StockAnalysisForm onResult={setStockAnalysisData} />
                {stockAnalysisData && <StockAnalysisResult data={stockAnalysisData} />}
                <DcaCalculatorForm onResult={setDcaCalculationData} />
                {dcaCalculationData && <DcaCalculationResult data={dcaCalculationData} />}
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
