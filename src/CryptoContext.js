import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
