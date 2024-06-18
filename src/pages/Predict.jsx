import React from "react";
import "./Predict.css";
import { Link } from "react-router-dom";

const Predict = () => {
  return (
    <>
      <div className="predict-head">
        <h2>Prediction Coins List</h2>
        <hr />
      </div>
      <div className="predict-list">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <Link
                to="https://bitcoin--prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Bitcoin</h5>
                    <p className="card-text">BTC</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://ethereum-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Ethereum</h5>
                    <p className="card-text">ETH</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://tether-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Tether USDt</h5>
                    <p className="card-text">USDT</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://bnb-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/bnb-bnb-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">BNB</h5>
                    <p className="card-text">BNB</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link
                to="https://xrp-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/xrp-xrp-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">XRP</h5>
                    <p className="card-text">XRP</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://bitcoin-cash-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Bitcoin Cash</h5>
                    <p className="card-text">BCH</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://dogecoin-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Dogecoin</h5>
                    <p className="card-text">DOGE</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://toncoin-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/toncoin-ton-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Toncoin</h5>
                    <p className="card-text">TON</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link
                to="https://cardano-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/cardano-ada-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Cardano</h5>
                    <p className="card-text">ADA</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://solana-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Solana</h5>
                    <p className="card-text">SOL</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://shiba-inu-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Shiba Inu</h5>
                    <p className="card-text">SHIB</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://avalanche-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/avalanche-avax-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Avalanche</h5>
                    <p className="card-text">AVAX</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link
                to="https://usdc-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">USDC</h5>
                    <p className="card-text">USDC</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://polkadot-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Polkadot</h5>
                    <p className="card-text">DOT</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://tron-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/tron-trx-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Tron</h5>
                    <p className="card-text">TRX</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://chainlink-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/chainlink-link-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Chainlink</h5>
                    <p className="card-text">LINK</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link
                to="https://polygon-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Polygon</h5>
                    <p className="card-text">MATIC</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://near-protocol-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/near-protocol-near-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">NEAR Protocol</h5>
                    <p className="card-text">NEAR</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://internet-computer-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/internet-computer-icp-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Internet Computer</h5>
                    <p className="card-text">ICP</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                to="https://litecoin-prediction.streamlit.app/"
                target="_blank"
                className="predict-card-link"
              >
                <div className="card predict-card">
                  <img
                    src="https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=032"
                    className="card-img-top predict-coin-img"
                    alt="BTC"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Litecoin</h5>
                    <p className="card-text">LTC</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Predict;
