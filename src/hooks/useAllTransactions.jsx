import { useState,useEffect } from "react";
import axios from "axios";

export const useAllTransactions = () => {
    const token = localStorage.getItem('token')
    const [transactions, setTransactions] = useState([])
    const [loadingTransactions, setLoadingTransactions] = useState(true)

    useEffect(() => {
    getAllTransactions()
    },[])

    const getAllTransactions = async () => {
    try {
      setLoadingTransactions(true)
      let page = 1;
      let allResults = [];
      let hasMore = true;

      while (hasMore) {
        const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/all-transaction?page=${page}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
            Accept: 'application/json'
          }
        });
        const data = res.data.result.data;

        if (data.length === 0) {
          hasMore = false;
        } else {
          allResults = [...allResults, ...data];
          page++;
        }
      }

      console.log("All categories:", allResults);
      setTransactions(allResults);
    } catch (err) {
      console.log(err);
    }finally{
      setLoadingTransactions(false)
    }
  };


    return{
        transactions,
        loadingTransactions,
        refetch: getAllTransactions
    }
}