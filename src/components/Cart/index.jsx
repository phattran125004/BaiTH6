import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart({ cartItems, handleCheckout }) {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0); // State để lưu tổng tiền

  useEffect(() => {
    // Tính tổng giá trị giỏ hàng
    const total = cartItems.reduce((acc, product) => acc + product.price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Giỏ hàng của bạn</h2>
      {cartItems.length > 0 ? (
        <>
          <div>
            {/* Danh sách sản phẩm trong giỏ hàng */}
            <ul className="border border-gray-300 rounded-lg divide-y divide-gray-200">
              {cartItems.map((product) => (
                <li key={product.id} className="flex justify-between p-4">
                  <span>{product.prdName}</span>
                  <span className="text-red-500 font-bold">
                    {product.price.toLocaleString()} VNĐ
                  </span>
                </li>
              ))}
            </ul>

            {/* Hiển thị tổng giá trị giỏ hàng */}
            <div className="mt-5 text-right">
              <p className="text-xl font-bold">
                Tổng cộng:{" "}
                <span className="text-red-500">
                  {totalPrice.toLocaleString()} VNĐ
                </span>
              </p>
            </div>

            {/* Nút Thanh toán */}
            <div className="text-end">
              <button
                onClick={() => handleCheckout()}
                className="mt-5 bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-all"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-xl mb-2">Giỏ hàng của bạn đang trống!</div>
          <button
            onClick={() => navigate("/")}
            className="py-2 text-white bg-green-500 px-4 rounded-lg hover:bg-green-600 transition-all"
          >
            Tiếp tục mua hàng
          </button>
        </>
      )}
    </section>
  );
}
