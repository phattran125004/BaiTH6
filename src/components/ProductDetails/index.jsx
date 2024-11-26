import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails({ handleAddToCart }) {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  useEffect(() => {
    // Gọi API để lấy chi tiết sản phẩm
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-6 max-w-3xl mx-auto border border-gray-200 rounded-lg shadow-lg bg-white mt-10">
      <h2 className="text-3xl font-bold text-gray-800">{product.prdName}</h2>
      <div className="flex">
        <img
          src={product.prdImage}
          alt={product.prdName}
          className="w-80 h-80 object-cover shadow-md py-5"
        />
        <div>
          <p className="text-xl font-semibold text-gray-800">
            Giá: {product.price.toLocaleString()} VNĐ
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Mô tả: {product.description}
          </p>
          <div className="text-end mt-20">
            <button
              onClick={() => {
                handleAddToCart(product);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-500"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-5 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
      >
        Quay lại
      </button>
    </section>
  );
}
