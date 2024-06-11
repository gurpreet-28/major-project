import { Button, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/Carousel";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
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

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Ubuntu",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Ubuntu",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div
          style={{
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Ubuntu",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Ubuntu",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Ubuntu",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Ubuntu",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Ubuntu",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Ubuntu",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: "40",
                backgroundColor: "#144b9d",
                color: "white",
                fontWeight: "bold",
                fontFamily: "Ubuntu",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
