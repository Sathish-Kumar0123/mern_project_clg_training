import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

export function createOrder(data) {
  return axios.post(API_URL, data);
}

export function getOrders() {
  return axios.get(API_URL);
}

export function getOrderById(id) {
  return axios.get(`${API_URL}/${id}`);
}

export function updateOrder(id, data) {
  return axios.put(`${API_URL}/${id}`, data);
}

export function deleteOrder(id) {
  return axios.delete(`${API_URL}/${id}`);
}