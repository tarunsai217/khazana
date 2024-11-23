import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.coingecko.com/api/v3";
let apiKey = import.meta.env.VITE_API_KEY;
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "x-cg-demo-api-key": apiKey,
  },
});

export const useCoins = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ["coins", page, perPage],
    queryFn: () => fetchCoins(page, perPage),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching coins:", error);
    },
  });
};

export const useCoinDetails = (id) => {
  return useQuery({
    queryKey: ["coinDetails", id],
    queryFn: () => fetchCoinDetails(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error(`Error fetching details for coin ${id}:`, error);
    },
  });
};

export const useCoinHistory = (id, days) => {
  return useQuery({
    queryKey: ["coinHistory", id, days],
    queryFn: () => fetchCoinHistory(id, days),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error(`Error fetching history for coin ${id}:`, error);
    },
    select: (data) => {
      return data.map((point) => ({
        timestamp: new Date(point[0]).toLocaleDateString(),
        price: point[1],
      }));
    },
  });
};

const fetchCoins = async (page = 1, perPage = 20) => {
  try {
    await delay(300);
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
    console.warn("CoinGecko API error:", error);
  }
};

const fetchCoinDetails = async (id) => {
  await delay(50);
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

const fetchCoinHistory = async (id, days) => {
  await delay(200);
  const response = await api.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: days,
    },
  });
  return response.data.prices;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
