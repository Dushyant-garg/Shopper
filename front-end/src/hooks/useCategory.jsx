import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("/category/getAllCategories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return categories
}