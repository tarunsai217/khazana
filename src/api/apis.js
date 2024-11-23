import axios from "axios";
import { mockCoins } from "./mockData";

const BASE_URL = "https://api.coingecko.com/api/v3";
let apiKey = import.meta.env.VITE_API_KEY;
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "x-cg-demo-api-key": apiKey,
  },
});

export const getCoins = async (page = 1, perPage = 20) => {
  try {
    const { data } = await api.get(`/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: perPage,
        page: page,
        sparkline: false,
      },
    });
    return data;
  } catch (error) {
    console.warn("Using mock data due to API error:", error);
    return mockCoins;
  }
};

export const fetchCoinDetails = async (id) => {
  const response = await api.get(`${BASE_URL}/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    },
  });
  return response.data;
};

export const fetchCoinHistory = async (id, days) => {
  const response = await api.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: days,
    },
  });
  return response.data.prices;
};
