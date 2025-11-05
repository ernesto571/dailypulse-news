import axios from "axios";


const API_BASE = import.meta.env.PROD 
  ? "https://dailypulse-f8ra.onrender.com/api/news" 
  : "http://localhost:5001/api/news";

// Business News
export const getBusinessNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/business`);
    return data; // array of articles
  } catch (error) {
    console.error("Error fetching business news:", error);
    return [];
  }
};

// Sports News
export const getSportsNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/sports`);
    return data;
  } catch (error) {
    console.error("Error fetching sports news:", error);
    return [];
  }
};

// Entertainment News
export const getEntertainmentNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/entertainment`);
    return data;
  } catch (error) {
    console.error("Error fetching entertainment news:", error);
    return [];
  }
};

// Crypto News
export const getCryptoNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/crypto`);
    return data;
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return [];
  }
};

// Technology News
export const getTechnologyNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/technology`);
    return data;
  } catch (error) {
    console.error("Error fetching technology news:", error);
    return [];
  }
};

// Health News
export const getHealthNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/health`);
    return data;
  } catch (error) {
    console.error("Error fetching health news:", error);
    return [];
  }
};

// General News
export const getGeneralNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/general`);
    return data;
  } catch (error) {
    console.error("Error fetching general news:", error);
    return [];
  }
};

// Arts News
export const getArtsNews = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/arts`);
    return data;
  } catch (error) {
    console.error("Error fetching arts news:", error);
    return [];
  }
};

// top headlines
export const getTopHeadlines = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/top-headlines`);
    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
};

// only from news hub
export const getOnlyDailyPulse = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/daily-pulse`);
    return data;
  } catch (error) {
    console.error("Error fetching only from news hub:", error);
    return [];
  }
};

// Search News
export const searchNews = async (query) => {
  try {
    const { data } = await axios.get(`${API_BASE}/search`, {
      params: { q: query }
    });
    return data;
  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
};