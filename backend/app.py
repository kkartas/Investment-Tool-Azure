# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from stock_analysis import calculate_indicators, get_latest_recommendation
from dca_calculations import dca_calculation
from load import fetch_yfinance_data
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/api/stock-analysis', methods=['POST'])
def stock_analysis():
    data = request.json
    stock_symbol = data.get('stock_symbol')
    start_date = data.get('start_date')
    end_date = data.get('end_date')

    # Fetch stock data
    stock_data, error_message = fetch_yfinance_data(stock_symbol)
    if stock_data is None:
        return jsonify({'error': error_message}), 400

    try:
        # Convert index to datetime and filter by date range
        stock_data.index = pd.to_datetime(stock_data.index)
        start_date = pd.to_datetime(start_date)
        end_date = pd.to_datetime(end_date)

        stock_data = stock_data.loc[(stock_data.index >= start_date) & (stock_data.index <= end_date)].copy()

        if stock_data.empty:
            return jsonify({'error': 'No data available for the selected date range.'}), 400

        # Calculate indicators
        stock_data = calculate_indicators(stock_data)

        # Get latest data
        latest_data = stock_data.iloc[-1].copy()
        latest_data['Symbol'] = stock_symbol.upper()
        latest_data['Date'] = latest_data.name.strftime('%Y-%m-%d')

        # Format stock_data dates
        stock_data = stock_data.reset_index()
        stock_data['Date'] = stock_data['Date'].dt.strftime('%Y-%m-%d')

        # Prepare response
        result = {
            'latest_data': latest_data.to_dict(),
            'recommendation': get_latest_recommendation(latest_data),
            'stock_data': stock_data.to_dict(orient='records')
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
