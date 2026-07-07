import axios from "axios";

const API_URL = "http://localhost:3000/products";

export function createProduct(data) {
  return axios.post(API_URL, data);
}

export function getProducts() {
  return axios.get(API_URL);
}

export function getProductById(id) {
  return axios.get(`${API_URL}/${id}`);
}

export function updateProduct(id, data) {
  return axios.put(`${API_URL}/${id}`, data);
}

export function deleteProduct(id) {
  return axios.delete(`${API_URL}/${id}`);
}