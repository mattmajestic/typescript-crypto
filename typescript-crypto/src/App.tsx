import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
}

const App: React.FC = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              ids: 'bitcoin,ethereum,cardano',
            },
          }
        );

        setCoinData(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Prices from CoinGecko API</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>${coin.current_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default App;
