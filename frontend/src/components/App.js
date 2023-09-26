import React, { useState, useEffect } from "react";
import "./App.css"; // Importing CSS for markdown styling.

function App() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [gradingAreas, setGradingAreas] = useState([
    { area: "Hold ETH", value: "5 ETH", score: 500 },
    { area: "Hold an ERC-20", value: "1000 DAI", score: 200 },
    { area: "Amount of ETH held", value: "10 ETH", score: 1000 },
    { area: "Number of ERC-20s held", value: "4 Tokens", score: 400 },
    { area: "Number of NFTs held", value: "3 NFTs", score: 300 },
    { area: "Smart contracts deployed", value: "2 Contracts", score: 200 },
    { area: "Dapps interacted with", value: "5 Dapps", score: 500 },
  ]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myScore, setMyScore] = useState(0);

  useEffect(() => {
    let score = gradingAreas.reduce((acc, curr) => acc + curr.score, 0);
    setMyScore(score);

    let board = [];
    for (let i = 0; i < 99; i++) {
      let isEns = Math.random() < 0.5;
      let address = isEns
        ? `user${i}.eth`
        : `0x${Math.random().toString(36).substring(2, 10)}...${Math.random()
            .toString(36)
            .substring(2, 10)}`;
      let score = Math.floor(Math.random() * 20000) + 1000;
      board.push({ address, score });
    }
    board.push({ address: "YourAddress", score });
    board.sort((a, b) => b.score - a.score);
    setLeaderboard(board);
  }, [gradingAreas]);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
    }, 2000);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`App ${theme}`}>
      <header>
        <h1>Base Rank</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </header>

      {!connected ? (
        <div className="home-content">
          <h2>Welcome to Base Rank!</h2>
          <p>
            Base Rank evaluates your activities on the Ethereum network and
            assigns a score based on various factors such as holding ETH,
            interacting with DApps, and more.
          </p>

          {/* Markdown Text */}
          <h2>What is Base?</h2>
          <p>
            Base is an Ethereum Layer 2 (L2) network developed and incubated
            inside Coinbase. Base is aimed to be a secure, low-cost, and
            developer-friendly environment for building decentralized
            applications (dapps). The main goal of Base is to make onchain the
            default online interaction, onboarding one million developers and
            one billion users into the global cryptoeconomy.
          </p>
          <h3>Features of Base</h3>
          <ul>
            <li>
              <strong>Secure and Low-cost</strong>: Base offers a secure
              environment to build dapps, minimizing costs for developers and
              users.
            </li>
            <li>
              <strong>Developer-Friendly</strong>: Base is EVM-equivalent and is
              designed to be easily accessible to developers, offering a
              straightforward platform to build dapps.
            </li>
            <li>
              <strong>Built on Optimism’s OP Stack</strong>: Base leverages
              Optimism's technology to envision a standard, modular, rollup
              agnostic Superchain.
            </li>
            <li>
              <strong>No New Network Token</strong>: Unlike other networks, Base
              does not plan to issue a new network token.
            </li>
          </ul>

          <button onClick={handleConnect} disabled={loading}>
            {loading ? "Calculating..." : "Connect Wallet"}
          </button>
        </div>
      ) : (
        <div>
          <h2>
            Your Score: <strong>{myScore}</strong>
          </h2>

          {/* Grading Area Table */}
          <table>
            <thead>
              <tr>
                <th>Grading Area</th>
                <th>Example Value</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {gradingAreas.map((area, index) => (
                <tr key={index}>
                  <td>{area.area}</td>
                  <td>{area.value}</td>
                  <td>{area.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Top 100</h2>
          {/* Leaderboard Table */}
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Address/ENS</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={
                    entry.address === "YourAddress" ? "user-score-row" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{entry.address}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
