import requests
import random
from datetime import datetime, timedelta

# CoinGecko API configuration
COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"
BITCOIN_CHART_URL = f"{COINGECKO_BASE_URL}/coins/bitcoin/market_chart/range"

class BitcoinGame:
    def __init__(self):
        pass

    def get_random_date_range(self):
        """Generate a random 30-day period from the last year"""
        to_date = datetime.now()
        from_date = to_date - timedelta(days=365)
        delta = to_date - from_date
        random_days = random.randint(0, delta.days - 30)
        random_start_date = from_date + timedelta(days=random_days)
        random_end_date = random_start_date + timedelta(days=30)

        # Convert to Unix timestamps
        start_timestamp = int(random_start_date.timestamp())
        end_timestamp = int(random_end_date.timestamp())

        return start_timestamp, end_timestamp, random_start_date, random_end_date

    def fetch_bitcoin_data(self, start_timestamp, end_timestamp):
        """Fetch Bitcoin price data from CoinGecko API"""
        try:
            params = {
                'vs_currency': 'usd',
                'from': start_timestamp,
                'to': end_timestamp
            }

            response = requests.get(BITCOIN_CHART_URL, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()
            prices = data.get('prices', [])

            if len(prices) < 2:
                return None

            start_price = prices[0][1]
            end_price = prices[-1][1]

            return {
                'start_price': start_price,
                'end_price': end_price,
                'price_change_percent': ((end_price - start_price) / start_price) * 100
            }

        except Exception as e:
            print(f"Error fetching Bitcoin data: {e}")
            return None

    def determine_trend(self, price_data):
        """Determine if Bitcoin was rising or falling"""
        if not price_data:
            return None

        change_percent = price_data['price_change_percent']

        return 'rising' if change_percent > 0 else 'falling'

    def generate_question(self):
        """Generate a new game question"""
        max_attempts = 5

        for _ in range(max_attempts):
            start_ts, end_ts, start_date, end_date = self.get_random_date_range()
            price_data = self.fetch_bitcoin_data(start_ts, end_ts)

            if price_data:
                trend = self.determine_trend(price_data)
                if trend:
                    return {
                        'start_date': start_date.strftime('%B %d, %Y'),
                        'end_date': end_date.strftime('%B %d, %Y'),
                        'start_price': round(price_data['start_price'], 2),
                        'end_price': round(price_data['end_price'], 2),
                        'correct_answer': trend,
                        'price_change_percent': round(price_data['price_change_percent'], 2)
                    }

        return None
    
game = BitcoinGame()

print(game.generate_question())