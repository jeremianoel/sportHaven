import axios from 'axios';
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';

export const useActivityDetail = () => {
    const {id} = useParams()
    const [detail, setDetail] = useState([])
    
    const getDetail = async () => {     
    try {
    const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/${id}`);
    console.log(res.data.result);
    setDetail(res.data.result);
  }
  catch (err) {
    console.log(err)
  }
};
    useEffect(() => {
        getDetail()
    },[])
    
    return{
        detail
    }
}