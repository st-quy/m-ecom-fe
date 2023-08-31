import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("orderId");
    const message = searchParams.get("message");

    // Đẩy dữ liệu lên API
    const postData = async () => {
      try {
        const response = await fetch("https://ecom-be-htgu.onrender.com/checkout/savedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            message,
          }), 
        });

        if (response.ok) {
          console.log("Dữ liệu đã được đẩy lên API thành công");
        } else {
          console.error("Đẩy dữ liệu lên API thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi đẩy dữ liệu lên API:", error);
      }
    };

    postData();
  }, [location.search]);

  return (
    <div>
      <h1>Payment Successful</h1>
      {/* Hiển thị thông tin hoặc tiếp tục xử lý */}
    </div>
  );
};

export default PaymentSuccessPage;