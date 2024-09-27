import React from "react";
import useCurrency from "../../helper/fetchAPI/useCurrency";
import Dropdown from "../Dropdown/Dropdown";

const Currency = () => {
  const {
    setAmount,
    convertedAmount,
    amount,
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
  } = useCurrency();

  const currencies = [
    { value: "PHP", label: "Philippine Peso (PHP)" },
    { value: "KRW", label: "Korean Won (KRW)" },
    { value: "USD", label: "US Dollar (USD)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "EUR", label: "Euro (EUR)" },
  ];

  return (
    <div className=" mx-auto bg-[#013A63]/5 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label className="block fira-sans-condensed-bold text-[#013A63]">
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 p-2 w-full border rounded-md bg-transparent border-[#013A63]"
        />
      </div>

      <div className="mb-4 flex items-center flex-col">
        <label className="block text-gray-700">Base Currency:</label>
        <Dropdown
          name="baseCurrency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          options={currencies}
          placeholder={
            currencies.find((c) => c.value === baseCurrency)?.label ||
            "Select Base Currency"
          }
        />
      </div>

      <div className="mb-4 flex items-center flex-col ">
        <label className="block text-gray-700">Target Currency:</label>
        <Dropdown
          name="targetCurrency"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          options={currencies}
          placeholder={
            currencies.find((c) => c.value === targetCurrency)?.label ||
            "Select Target Currency"
          }
        />
      </div>

      <div className="text-lg font-semibold bg-[#013A63]/5 w-full py-3 px-6 fira-sans-condensed-bold text-[#013A63]">
        {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
      </div>
    </div>
  );
};

export default Currency;
