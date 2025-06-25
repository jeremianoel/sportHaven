import { useState,useEffect } from "react";
import axios from "axios";

export const useAllCategories = () => {

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
    getCategories()
    },[])

    const getCategories = async () => {
    try {
      setLoadingCategories(true);
      let page = 1;
      let allResults = [];
      let hasMore = true;

      while (hasMore) {
        const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories?page=${page}`);
        const data = res.data.result.data;

        if (data.length === 0) {
          hasMore = false;
        } else {
          allResults = [...allResults, ...data];
          page++;
        }
      }

      console.log("All categories:", allResults);
      setCategories(allResults);
    } catch (err) {
      console.log(err);
    }finally {
    setLoadingCategories(false);
  }
  };


    return{
        categories,
        loadingCategories,
        refetch: getCategories
    }
}