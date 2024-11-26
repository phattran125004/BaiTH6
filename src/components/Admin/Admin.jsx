import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    prdName: "",
    prdImage: "",
    price: 0,
    description: "",
  });
  const [editProduct, setEditProduct] = useState(null); // Trạng thái sản phẩm cần sửa

  // Lấy danh sách sản phẩm
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

  // Xử lý thêm sản phẩm
  const handleAddProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ prdName: "", prdImage: "", price: 0, description: "" });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  // Xử lý sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct({ ...product }); // Đưa dữ liệu sản phẩm vào form
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/products/${editProduct._id}`, newProduct)
      .then((response) => {
        setProducts(
          products.map((product) =>
            product._id === editProduct._id ? response.data : product
          )
        );
        setEditProduct(null);
        setNewProduct({ prdName: "", prdImage: "", price: 0, description: "" });
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  // Xử lý xóa sản phẩm
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

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Quản lý sản phẩm</h2>

      {/* Form thêm/sửa sản phẩm */}
      <form
        onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}
        className="mb-8"
      >
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.prdName}
          onChange={(e) =>
            setNewProduct({ ...newProduct, prdName: e.target.value })
          }
          className="block w-full p-2 mb-2 border"
        />
        <input
          type="text"
          placeholder="Link hình ảnh"
          value={newProduct.prdImage}
          onChange={(e) =>
            setNewProduct({ ...newProduct, prdImage: e.target.value })
          }
          className="block w-full p-2 mb-2 border"
        />
        <input
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="block w-full p-2 mb-2 border"
        />
        <textarea
          placeholder="Mô tả sản phẩm"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="block w-full p-2 mb-2 border"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </form>

      {/* Danh sách sản phẩm */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tên sản phẩm</th>
            <th className="border border-gray-300 p-2">Hình ảnh</th>
            <th className="border border-gray-300 p-2">Giá</th>
            <th className="border border-gray-300 p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">{product.prdName}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={product.prdImage}
                  alt={product.prdName}
                  className="w-16 h-16"
                />
              </td>
              <td className="border border-gray-300 p-2">
                {product.price.toLocaleString()} VNĐ
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
