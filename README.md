# Bitcoin Prediction Game
A small Flask app that lets you guess if Bitcoin was rising or falling during a period of time. The main goal of this repository is to understand the basics of full-stack development using Python Flask as the backend and HTLM, CSS and JavaScript as the frontend.

## Features

- **Real Bitcoin Data**: Uses CoinGecko API for accurate historical price data
- **Interactive Gameplay**: Predict if Bitcoin was rising or falling
- **Score Tracking**: Monitor your prediction accuracy

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Setup Instructions

1. **Navigate to the project directory:**
   ```bash
   cd guess-the-trend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv

   # On Windows:
   venv\Scripts\activate

   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```

5. **Open your web browser and visit:**
   ```
   http://localhost:5000
   ```
## Development Mode

The application runs in debug mode by default, which provides:
- Automatic reloading on code changes
- Detailed error messages
- Interactive debugging

For production deployment, set `debug=False` in `app.py`.

## Credits

- Bitcoin data provided by [CoinGecko](https://coingecko.com)
- Built with Flask

## License

This project is open source and available under the MIT License.
