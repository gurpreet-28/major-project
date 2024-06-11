import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import "./Navbar.css";
import crypto from "./crypto.png";
import { CryptoState } from "../CryptoContext";
import UserSidebar from "./UserSidebar";
import { MenuItem, Select } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-inverse sticky-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={crypto}
              alt="Logo"
              width="36"
              className="d-inline-block align-text-top"
            ></img>{" "}
            CoinsCrypt
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/coins">
                  Cryptocurrencies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/predict">
                  Predict
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <div>
                <Select
                  variant="outlined"
                  style={{
                    width: 100,
                    height: 40,
                    marginRight: 10,
                    color: "black",
                  }}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
              </div>
              <div>{user ? <UserSidebar /> : <AuthModal />}</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
