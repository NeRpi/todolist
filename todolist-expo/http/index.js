import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "http://192.168.100.14:5000/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default $api;
