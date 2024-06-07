import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";
import News from "./pages/News";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import NumbersState from "./context/NumbersState";
import AlertBox from "./components/AlertBox";
import Predict from "./pages/Predict";

function App() {
  return (
    <div className="App">
      <NumbersState>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/coins" element={<Cryptocurrencies />} exact />
            <Route path="/coin/:uuid" element={<CoinPage />} exact />
            <Route path="/predict" element={<Predict />} exact />
            <Route path="/news" element={<News />} exact />
          </Routes>
          <Footer />
          <AlertBox />
        </BrowserRouter>
      </NumbersState>
    </div>
  );
}

export default App;
