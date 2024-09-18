# backend/stock_analysis.py

import pandas as pd
import pandas_ta as ta

def calculate_indicators(data):
    data['SMA_50'] = ta.sma(data['Close'], length=50)
    data['SMA_200'] = ta.sma(data['Close'], length=200)
    data['RSI'] = ta.rsi(data['Close'], length=14)
    macd = ta.macd(data['Close'])
    data['MACD'] = macd['MACD_12_26_9']
    data['Signal_Line'] = macd['MACDs_12_26_9']
    return data

def get_latest_recommendation(latest):
    recommendation = 'Hold'
    if latest['RSI'] < 30 and latest['MACD'] > latest['Signal_Line']:
        recommendation = 'Buy'
    elif latest['RSI'] > 70 and latest['MACD'] < latest['Signal_Line']:
        recommendation = 'Sell'
    return recommendation
