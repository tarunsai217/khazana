import axios from "axios";
const BASE_URL = "https://api.coingecko.com/api/v3";
import { mockCoins } from "./mockData";
console.log("mockCoins", mockCoins);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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
  const response = await axios.get(`${BASE_URL}/coins/${id}`, {
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
  const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: days,
    },
  });
  return response.data.prices;
};
