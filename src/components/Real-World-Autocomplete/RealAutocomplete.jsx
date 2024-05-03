import React from "react";
import { GRAPHIC_URL, BANK_UPI_HANDLES, NOPE } from "./constants";
import "./style.css";
import { useState } from "react";
const RealAutocomplete = () => {
  const [upiId, setUpiId] = useState("");
  const [prediction, setPrediction] = useState("");
  const [predictions, setPredictions] = useState([]);
  const handleUpiIdChange = (e) => {
    const {
      target: { value = "" },
    } = e;
    setUpiId(value);
    if (!value || !value.includes("@")) {
      setPrediction(value || "");
      setPredictions([]);
      return;
    }
    const [currentUserName, currentUserBankName] = value.split("@");
    if (!currentUserName) return;
    const userBankNameReg = new RegExp(`${currentUserBankName}`);
    const matchedBankNames = BANK_UPI_HANDLES.filter((bankName) => {
      return userBankNameReg.test(bankName);
    });
    let currentPredictedBankName = matchedBankNames[0];
    if (currentUserBankName && !matchedBankNames.length) {
      currentPredictedBankName = "";
    }
    setPrediction(`${currentUserName}@${currentPredictedBankName}`);
    setPredictions(matchedBankNames);
  };
  const handleBankNameClick = (e) => {
    const { target } = e;
    const currentBankName = target.getAttribute("data-bank-name");
    const [currentUser] = upiId.split("@");
    const updatedUpiId = `${currentUser}@${currentBankName}`;
    setUpiId(updatedUpiId);
    setPrediction(updatedUpiId);
    setPredictions([]);
  };
  const handleKeyPress = (e) => {
    const { which = -1, keyCode = -1, code = "" } = e;
    const isRightArrowClick =
      which === 39 || keyCode === 39 || code.toLowerCase() === "arrowright";
    if (isRightArrowClick) {
      setUpiId(prediction);
      setPredictions([]);
    }
  };
  return (
    <div className="container">
      <img src={GRAPHIC_URL} alt="Payment Pic" />
      <form>
        <div className="input-container">
          <input type="text" value={prediction} onChange={NOPE} />
          <input
            type="text"
            placeholder="Enter your UPI ID"
            pattern=".+@.+"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck="off"
            value={upiId}
            onChange={handleUpiIdChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button>Pay Now</button>
        {predictions.length ? (
          <ul>
            {predictions.map((prediction) => {
              return (
                <li
                  key={prediction}
                  data-bank-name={prediction}
                  onClick={handleBankNameClick}
                >
                  {prediction}
                </li>
              );
            })}
          </ul>
        ) : null}
      </form>
    </div>
  );
};

export default RealAutocomplete;
