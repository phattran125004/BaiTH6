import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products({ handleAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-5">Danh Sách Laptop</h2>
      <div className="grid grid-cols-4 gap-16">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-center mb-4">
              <img
                src={product.prdImage}
                alt={product.prdName}
                className="w-[80%] h-[80%] object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">{product.prdName}</h3>
            <p className="text-red-400 font-medium text-lg">
              {product.price.toLocaleString()} VNĐ
            </p>
            <Link
              to={`/detail/${product._id}`}
              state={{ product }}
              className="w-full block text-center bg-blue-500 text-white py-2 rounded-lg mb-2"
            >
              Chi tiết sản phẩm
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full block bg-green-500 text-white py-2 rounded-lg"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
