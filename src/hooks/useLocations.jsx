import axios from 'axios';
import { useState,useEffect } from 'react'

export const useLocations = () => {

    const [locations, setLocations] = useState([])
    const [loadingLocations, setLoadingLocations] = useState(true);
    
    useEffect(() => {
    getLocations()
    },[])

    const getLocations = async () => {
    try {
      setLoadingLocations(true);
      let page = 1;
      let allResults = [];
      let hasMore = true;

      while (hasMore) {
        const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/location/cities?page=${page}`);
        const data = res.data.result.data;

        if (data.length === 0) {
          hasMore = false;
        } else {
          allResults = [...allResults, ...data];
          page++;
        }
      }

      console.log("All cities:", allResults);
      setLocations(allResults);
    } catch (err) {
      console.log(err);
    }finally {
    setLoadingLocations(false);
  }
  };



    return {
        locations,
        loadingLocations
    }
}