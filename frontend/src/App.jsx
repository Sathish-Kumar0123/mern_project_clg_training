import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Users />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;