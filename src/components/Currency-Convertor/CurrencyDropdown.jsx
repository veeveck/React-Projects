import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
}) => {
  const isFavorite = (curr) => favorites.includes(curr);
  return (
    <div className="absolute inset-y-0 right-0 flex items-center">
      <select
        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500x sm:text-sm"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {favorites.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
        <hr />
        {currencies
          ?.filter((curr) => !favorites.includes(curr))
          .map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
      </select>
      <button className="pr-3" onClick={() => handleFavorite(currency)}>
        {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
      </button>
    </div>
  );
};

export default CurrencyDropdown;
