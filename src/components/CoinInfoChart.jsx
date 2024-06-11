import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./CoinInfoChart.css";
import { chartDays } from "../config/data";
import NumbersContext from "../context/NumbersContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@mui/material";

const CoinInfoChart = ({ uuid, coin }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const context = useContext(NumbersContext);
  const { convertToInternationalCurrencySystem } = context;
  const { user, watchlist, setAlert } = CryptoState();

  const [historicData, setHistoricData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [duration, setDuration] = useState("24h");
  const [label, setLabel] = useState("24 Hours");
  const [flag, setFlag] = useState(false);

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < historicData?.data?.history?.length; i += 1) {
    coinPrice.push(historicData?.data?.history[i].price);
  }

  for (let i = 0; i < historicData?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(historicData?.data?.history[i].timestamp));
  }

  console.log(coinPrice);
  console.log(coinTimestamp);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.name] : [coin?.name],
      });

      setAlert({
        open: true,
        message: `${coin?.name} Added to Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.name),
        },
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin?.name} Removed to Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };
  const inWatchlist = watchlist.includes(coin?.name);

  const checkCoin = () => {
    let index = watchlist.findIndex((object) => {
      return object.name === coin.name;
    });
    if (index !== -1) {
      setFlag(true);
    }
  };

  const fetchHistoricalData = async () => {
    const options1 = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/history`,
      params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: duration },
      headers: {
        "X-RapidAPI-Key": "27d95d49fcmshe45a3ec39ce438ap1e9abbjsn137363eadc59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };
    const { data } = await axios.request(options1);
    // console.log(data.data.history[0].price);
    setHistoricData(data);

    // const options2 = {
    //   method: "GET",
    //   url: `https://api.coingecko.com/api/v3/coins/${coin.name}/market_chart?vs_currency=usd&days=1`,
    // };
    // const { chartData } = await axios.get(
    //   `https://api.coingecko.com/api/v3/coins/${coin.name.toLowerCase()}/market_chart?vs_currency=usd&days=1`
    // );
    // console.log(chartData);
    // setChartData(chartData);
  };

  const fetchChartData = async () => {
    const { chartData } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin.name.toLowerCase()}/market_chart?vs_currency=usd&days=1`
    );
    console.log(chartData);
  };

  useEffect(() => {
    fetchHistoricalData();
    // fetchChartData();
    checkCoin();
    // eslint-disable-next-line
  }, [duration]);

  return (
    <>
      <div className="coin-head">
        <img
          src={coin.iconUrl}
          alt="coin-icon"
          style={{ width: "72px", marginBottom: "5px" }}
        />
        <div className="name-head">
          <h1>{coin.name}</h1>
        </div>
        <p>
          {coin.name} live price in US Dollars. View Statistics, Market cap and
          Supply
        </p>
      </div>
      <div className="row chart-head">
        <div className="col info-head">
          <h2>{coin.name} Price Chart</h2>
          <div className="days mt-3">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle days-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {label}
              </button>
              <ul className="dropdown-menu">
                {chartDays.map((day) => {
                  return (
                    <li key={Math.random()}>
                      <button
                        className="dropdown-item"
                        key={day.value}
                        type="button"
                        onClick={() => {
                          setDuration(day.value);
                          setLabel(day.label);
                        }}
                      >
                        {day.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {user && (
              <Button
                variant="outlined"
                style={{
                  width: "37%",
                  height: "40",
                  color: "#144B9D",
                }}
                onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              >
                {inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              </Button>
            )}
          </div>
        </div>
        <div className="col price-head text-end">
          <h3>
            <span>Current {coin.name} price in USD: </span>$
            {convertToInternationalCurrencySystem(coin.price)}
          </h3>
          <h3 className="mt-3">
            <span>Change in last 24h: </span>
            <span
              style={coin.change < 0 ? { color: "red" } : { color: "green" }}
            >
              {coin.change}%
            </span>
          </h3>
        </div>
      </div>
      <div className="chart" style={{ width: "90%" }}>
        <Line data={data} options={options} />
        {/* <Line
          key={Math.random()}
          data={{
            labels: historicData.map((data) => {
              let date = new Date(data.timestamp);
              // let time =
              //   date.getHours() > 12
              //     ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              //     : `${date.getHours()}:${date.getMinutes()} AM`;

              // return duration === "24h" ? time : date.toLocaleDateString();
              return date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.map((data) => data.price),
                label: `Price in USD`,
                borderColor: "#144b9d",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          }}
        /> */}
      </div>
    </>
  );
};

export default CoinInfoChart;
