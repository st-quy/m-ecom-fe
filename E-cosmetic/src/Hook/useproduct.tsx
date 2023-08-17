import { useState, useEffect } from "react";
import axios from "axios";

const UseProduct = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecom-be-htgu.onrender.com/products", {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });

        const { products, total } = response.data;

        setData(products);
        setTotalItems(total);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleQuickJumper = (page: number) => {
    setCurrentPage(page);
  };
  return {
    data,
    currentPage,
    totalPages,
    handlePageChange,
    handleQuickJumper,
    totalItems
  };
};

export default UseProduct;