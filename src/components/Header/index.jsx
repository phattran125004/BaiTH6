import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ cartItems }) {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      {/* Nút điều hướng về trang chủ */}
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-gray-800 hover:text-gray-600"
      >
        My Store
      </button>

      <nav className="flex space-x-4">
        {/* Đường dẫn đến Admin */}
        <Link
          to="/admin"
          className="text-lg text-green-600 hover:text-green-800"
        >
          Admin
        </Link>

        {/* Đường dẫn đến Giỏ hàng */}
        <Link
          to="/cart"
          className="text-lg text-blue-600 hover:text-blue-800 flex items-center"
        >
          Giỏ hàng
          {cartItems.length > 0 ? (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white rounded-full text-sm">
              {cartItems.length}
            </span>
          ) : (
            <span className="ml-2 text-gray-500">(Trống)</span>
          )}
        </Link>
      </nav>
    </header>
  );
}
