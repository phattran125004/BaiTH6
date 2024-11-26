const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const products = [
  {
    prdName: "Laptop Lenovo Ideapad Slim 3",
    price: 14290000,
    prdImage:
      "https://hanoicomputercdn.com/media/product/84729_82029_laptop_lenovo_ideapad_slim.jpg",
    description: "Hỗ trợ làm việc và giải trí đa phương tiện.",
  },
  {
    prdName: "Laptop Acer Gaming Aspire 5",
    price: 15490000,
    prdImage:
      "https://anphat.com.vn/media/product/47469_acer_gaming_aspire_5_a515_58gm_53pz_anphatpc55_1.jpg",
    description: "Cấu hình mạnh mẽ, thiết kế sang trọng.",
  },
  {
    prdName: "Laptop Dell XPS 15",
    price: 21990000,
    prdImage:
      "https://bizweb.dktcdn.net/thumb/grande/100/512/769/products/dell-xps-7590.jpg?v=1719460122273",
    description: "Hỗ trợ đồ họa chuyên nghiệp.",
  },
  {
    prdName: "Laptop Asus Gaming ROG Strix G15",
    price: 18490000,
    prdImage:
      "https://owlgaming.vn/wp-content/uploads/2020/06/ASUS-ROG-Strix-G15-G512-ORIGINAL-BLACK.jpg",
    description:
      "Laptop gaming esports với màn hình nhanh nhất thế giới 300Hz.",
  },
  {
    prdName: "Laptop MSI GF63 Thin 10SC",
    price: 14500000,
    prdImage:
      "https://gamalaptop.vn/wp-content/uploads/2021/10/Laptop-Gaming-MSI-GF63-10SC-255VN-i5-10300H-GTX-1650-01.jpg",
    description: "Là chiếc Laptop có thiết kế và hiệu suất ấn tượng",
  },
  {
    prdName: "Laptop HP Gaming Victus 16",
    price: 17240000,
    prdImage:
      "https://vitinhmainguyen.com/wp-content/uploads/2022/11/49604_hp_gaming_victus_16_e1107ax_amd_a_3.jpg",
    description:
      "Laptop HP Gaming Victus 16 đáp ứng tốt nhu cầu của game thủ và người dùng sáng tạo.",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();
