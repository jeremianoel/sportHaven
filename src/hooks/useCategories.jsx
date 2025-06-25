import axios from 'axios';
import { useState,useEffect } from 'react'

export const useCategories = () => {
const [categories, setCategories] = useState([])
const [page, setPage] = useState(1)

const nextPage = () => {
  setPage((prev) => {
    const next = prev < 2 ? prev + 1 : prev;
    return next;
  });
};

const prevPage = () => {
  setPage((prev) => {
    const back = prev > 1 ? prev - 1 : prev;
    return back;
  });
};

  const getCategories = async () => {     
  try {
    const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories?page=${page}`);
    console.log(res.data.result.data);
    setCategories(res.data.result.data);
  } catch (err) {
    console.log(err)
  }
};

useEffect(() => {
    getCategories()
  },[page])

    return {
        categories,
        nextPage,
        prevPage,
        page
    }
}