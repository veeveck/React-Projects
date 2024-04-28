import React, { useState, useEffect } from "react";
import { IoMdSwap } from "react-icons/io";
const CurrencyConvertor = () => {
  //states
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(60);
  const [fromCurrency, setFromCurrency] = useState("CAD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converting, setConverting] = useState(false);
  // Currencies -> https://api.frankfurter.app/currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      console.log(data);
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
  useEffect(() => {
    fetchCurrencies();
  }, []);
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-center text-gray-700">
        Currency Convertor
      </h2>
      <div className="flex gap-9">
        <div className="border-4 border-blue-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1">
          <input type="number" value={amount}></input>
          <label>CAD</label>
        </div>
        <IoMdSwap className="w-35 h-35 mt-3" />
        <div
          className="
          border-4
          border-blue-500
          rounded-sm
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          mt-1"
        >
          <input type="number" value={convertedAmount}></input>
          <label>INR</label>
        </div>
      </div>
      <div
        onClick={convertCurrency}
        className="px-5 py-2 mt-7 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Convert
      </div>
    </div>
  );
};

export default CurrencyConvertor;
