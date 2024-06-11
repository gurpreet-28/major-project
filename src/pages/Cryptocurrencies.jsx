import { Pagination, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import NumbersContext from "../context/NumbersContext";
import "./Cryptocurrencies.css";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

function Cryptocurrencies() {
  const navigate = useNavigate();
  const { currency } = CryptoState();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  coins.sort((a, b) => {
    return a.rank - b.rank;
  });

  const context = useContext(NumbersContext);
  const { convertToInternationalCurrencySystem } = context;

  useEffect(() => {
    document.title = "Coins - CoinsCrypt";
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

  return (
    <>
      <div className="crypto-list">
        <div className="container py-4">
          <h2 className="pb-2 mb-4 border-bottom">
            Cryptocurrency Prices by Market Cap
          </h2>
          <TextField
            label="Search for a cryptocurrency"
            style={{ marginBottom: "0", width: "100%" }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {loading ? (
            <Spinner />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover crypto-table align-middle mt-4">
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Coin</th>
                    <th scope="col">Price</th>
                    <th scope="col">24H Change</th>
                    <th scope="col">Market Cap</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((coin) => {
                      return (
                        <tr key={coin.name} className="coin-coin">
                          <th scope="coin">{coin.market_cap_rank}</th>
                          <td
                            onClick={() => {
                              navigate(`/coin/${coin.id}`);
                            }}
                            className="coin-name"
                          >
                            <img
                              src={coin.image}
                              alt="coin-img"
                              style={{ width: "50px" }}
                              className="table-coin-img me-2"
                            />
                            {coin.name}
                          </td>
                          <td>
                            $
                            {convertToInternationalCurrencySystem(
                              coin.current_price
                            )}
                          </td>
                          <td
                            style={
                              coin.price_change_percentage_24h < 0
                                ? { color: "red" }
                                : { color: "green" }
                            }
                          >
                            {coin.price_change_percentage_24h}%
                          </td>
                          <td>
                            $
                            {convertToInternationalCurrencySystem(
                              coin.market_cap
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}

          <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            color="primary"
            count={(handleSearch()?.length / 10).toFixed(0) || 0}
            onChange={(_, value) => {
              setPage(value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Cryptocurrencies;
