import axios from "axios";
import { useEffect, useState } from "react";

const useCurrency = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("PHP");
  const [targetCurrency, setTargetCurrency] = useState("KRW");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        setExchangeRate(response.data.rates[targetCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  return {
    setAmount,
    convertedAmount,
    amount,
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
  };
};

export default useCurrency;
