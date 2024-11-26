import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Admin from "./components/Admin/Admin";

function App() {
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng
  const [products, setProducts] = useState([]); // Danh sách sản phẩm

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data); // Cập nhật danh sách sản phẩm
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      alert("Sản phẩm đã có trong giỏ hàng!");
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  // Thanh toán: Xóa giỏ hàng và gửi yêu cầu đến backend
  const handleCheckout = () => {
    axios
      .post("http://localhost:5000/api/cart/checkout", { items: cartItems })
      .then(() => {
        setCartItems([]); // Xóa giỏ hàng sau khi thanh toán thành công
        alert("Thanh toán thành công!");
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        alert("Đã xảy ra lỗi khi thanh toán.");
      });
  };

  // Xóa sản phẩm trong Admin: Cập nhật sản phẩm
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <BrowserRouter>
      <Header cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} handleAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/detail/:id"
          element={<ProductDetails handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart cartItems={cartItems} handleCheckout={handleCheckout} />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              products={products}
              setProducts={setProducts}
              handleDeleteProduct={handleDeleteProduct}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
