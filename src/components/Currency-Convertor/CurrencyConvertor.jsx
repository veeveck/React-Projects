import React, { useEffect } from "react";

const CurrencyConvertor = () => {
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
  useEffect(() => {
    fetchCurrencies();
  }, []);
  return <div className="font-bold">CurrencyConvertor</div>;
};

export default CurrencyConvertor;
