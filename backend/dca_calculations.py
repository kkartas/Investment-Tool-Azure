# backend/dca_calculations.py

import pandas as pd

def dca_calculation(initial_investment, periodic_investment, period, years, average_interest):
    periods_per_year = {
        'weekly': 52,
        'monthly': 12,
        'quarterly': 4,
        'yearly': 1
    }

    n_periods = periods_per_year[period] * years
    periodic_rate = (1 + average_interest) ** (1 / periods_per_year[period]) - 1

    total_invested = initial_investment + periodic_investment * n_periods
    future_value = initial_investment * (1 + periodic_rate) ** n_periods

    for i in range(n_periods):
        future_value += periodic_investment * (1 + periodic_rate) ** (n_periods - i)

    total_profit = future_value - total_invested

    # Prepare data points for plotting
    dates = pd.date_range(start=pd.Timestamp.today(), periods=n_periods, freq=period[0].upper())
    invested = [initial_investment + periodic_investment * i for i in range(n_periods)]
    value = []

    for i in range(n_periods):
        val = initial_investment * (1 + periodic_rate) ** i
        for j in range(i):
            val += periodic_investment * (1 + periodic_rate) ** (i - j)
        value.append(val)

    data_points = {
        'dates': dates.strftime('%Y-%m-%d').tolist(),
        'invested': invested,
        'value': value
    }

    return total_invested, future_value, total_profit, data_points
