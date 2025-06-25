import axios from 'axios';
import { useState,useEffect } from 'react'

export const useActivites = () => {  

  const [activities, setActivities] = useState([])
  const [loadingActivities, setLoadingActivites] = useState(true);
  
  useEffect(() => {
    getActivities()
  },[])    

  const getActivities = async () => { 
  try {
      setLoadingActivites(true);
      let page = 1;
      let allResults = [];
      let hasMore = true;

      while (hasMore) {
        const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities?page=${page}`);
        const data = res.data.result.data;

        if (data.length === 0) {
          hasMore = false;
        } else {
          allResults = [...allResults, ...data];
          page++;
        }
      }

      console.log("All activities:", allResults);
      setActivities(allResults);
    }
  catch (err) {
    console.log(err)
  }
  finally {
    setLoadingActivites(false);
  }
};
    return{
        activities,
        loadingActivities,
        refetch: getActivities
    }
}