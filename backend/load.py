# backend/load.py

import yfinance as yf

def fetch_yfinance_data(stock_symbol):
    try:
        data = yf.download(stock_symbol, progress=False)
        if data.empty:
            return None, f"No data found for symbol: {stock_symbol}"
        return data, None
    except Exception as e:
        return None, str(e)
