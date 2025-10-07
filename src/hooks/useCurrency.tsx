import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CurrencyContextType {
  currency: "USD" | "INR";
  setCurrency: (currency: "USD" | "INR") => void;
  formatCurrency: (amount: number) => string;
  convertCurrency: (amount: number, fromCurrency?: "USD" | "INR") => number;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock exchange rates (in real app, this would come from an API)
const EXCHANGE_RATES = {
  USD_TO_INR: 83.50,
  INR_TO_USD: 1 / 83.50,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<"USD" | "INR">(() => {
    // Load from localStorage or default to USD
    const saved = localStorage.getItem("currency");
    return (saved === "USD" || saved === "INR") ? saved : "USD";
  });

  // Save to localStorage whenever currency changes
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const setCurrency = (newCurrency: "USD" | "INR") => {
    setCurrencyState(newCurrency);
  };

  const formatCurrency = (amount: number) => {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    } else {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
    }
  };

  // Convert currency amounts (assumes input is in USD by default)
  const convertCurrency = (amount: number, fromCurrency: "USD" | "INR" = "USD") => {
    if (fromCurrency === currency) {
      return amount; // No conversion needed
    }

    if (fromCurrency === "USD" && currency === "INR") {
      return amount * EXCHANGE_RATES.USD_TO_INR;
    } else if (fromCurrency === "INR" && currency === "USD") {
      return amount * EXCHANGE_RATES.INR_TO_USD;
    }

    return amount;
  };

  const getCurrencySymbol = () => {
    return currency === "USD" ? "$" : "₹";
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatCurrency,
        convertCurrency,
        getCurrencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};