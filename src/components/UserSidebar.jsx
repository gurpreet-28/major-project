import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../CryptoContext";
import { Avatar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import axios from "axios";
import NumbersContext from "../context/NumbersContext";
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  profile: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#194E9E",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#194E9E",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    color: "rgba(255, 255, 255,0.9)",
    backgroundColor: "rgba(0,0,0, 0.2)",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "white",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#144B9D",
  },
  price: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [coins, setCoins] = React.useState([]);
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist } = CryptoState();
  const context = React.useContext(NumbersContext);
  const { convertToInternationalCurrencySystem } = context;

  const fetchCoins = async () => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "100",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": "27d95d49fcmshe45a3ec39ce438ap1e9abbjsn137363eadc59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    const { data } = await axios.request(options);
    setCoins(data.data.coins);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful!",
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
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

  React.useEffect(() => {
    fetchCoins();
  });

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginRight: 15,
              cursor: "pointer",
              backgroundColor: "#194E9E",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.name))
                      return (
                        <div className={classes.coin}>
                          <span className={classes.price}>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            ${convertToInternationalCurrencySystem(coin.price)}
                            <i
                              class="fa-solid fa-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeFromWatchlist(coin)}
                            ></i>
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
