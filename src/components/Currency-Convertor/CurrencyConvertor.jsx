import React, { useState, useEffect } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import CurrencyDropdown from "./CurrencyDropdown";
import Flags from "country-flag-icons/react/3x2";
const CurrencyConvertor = () => {
  //states
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(60);
  const [fromCurrency, setFromCurrency] = useState("CAD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["CAD", "USD", "INR"]
  );
  const FirstFlag = Flags[fromCurrency.slice(0, -1)];
  const SecondFlag = Flags[toCurrency.slice(0, -1)];
  // Currencies -> https://api.frankfurter.app/currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      console.log(data);
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      console.log(data);
      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.log("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency))
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    else updatedFavorites.push(currency);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);
  return (
    <div className="max-w-2xl h-70 mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-center text-gray-700">
        Currency Convertor
      </h2>
      <div className="flex gap-8">
        <div className="flex relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-0.5">
            <span>
              <FirstFlag className="h-8" />
            </span>
          </div>
          <input
            className="block w-full  rounded-md border-0 py-1.5 pl-14 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CurrencyDropdown
            currencies={currencies}
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            handleFavorite={handleFavorite}
            favorites={favorites}
          />
        </div>
        <button
          onClick={handleSwap}
          className="mt-1 p-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-500"
        >
          <HiArrowsRightLeft className="text-xl text-gray-800" />
        </button>
        <div className="flex relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-0.5">
            <SecondFlag className="h-8" />
          </div>
          <input
            className="block w-full rounded-md border-0 py-1.5 pl-14 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            type="text"
            value={convertedAmount}
            onChange={(e) => setConvertedAmount(e.target.value)}
          />
          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            currency={toCurrency}
            setCurrency={setToCurrency}
            handleFavorite={handleFavorite}
          />
        </div>
      </div>
      <div
        onClick={convertCurrency}
        className={`px-5 py-2 mt-12 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          converting ? "animate-pulse" : ""
        }`}
      >
        Convert
      </div>
    </div>
  );
};

export default CurrencyConvertor;
