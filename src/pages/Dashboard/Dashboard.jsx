import axios from "axios"
import { useState,useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import Photo from "../../assets/foto1.png"
import {useAllCategories} from "../../hooks/useAllCategories"
import {useActivites} from "../../hooks/useActivities"
import {useAllTransactions} from "../../hooks/useAllTransactions"
import Spinner from '../../components/Spinner'

const Dashboard = () => {
    const [data,setData] = useState([])
    const {categories, loadingCategories} = useAllCategories()
    const {activities, loadingActivities} = useActivites()
    const {transactions,loadingTransactions} = useAllTransactions()
    const token = localStorage.getItem('token')


    const getData = async () => {     
    try {
        const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/me`,
            {
                headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            }
        );
        console.log(res.data.data);
        setData(res.data.data);
        
        
    } catch (err) {
        console.log(err)
    }
    };

    useEffect(() => {
        getData()
    },[])

    return(
        <div className="flex bg-gray-100 ml-[17%] min-h-screen">
            <DashboardNavBar/>
            <div className="flex flex-col justify-start items-center w-full m-3 gap-5">
                <div className="w-full flex h-auto justify-between items-center bg-white shadow-md rounded-md px-7 py-5">
                <p className="text-black text-3xl font-semibold">Dashboard</p>
                <div className="flex gap-5 px-2">
                    <img className="w-17 rounded-full" src={Photo}/>
                    <div className="flex flex-col items-start justify-center gap-3">
                    <p className="text-sm font-bold">{data.email}</p>
                    <p className="text-sm">{data.name}</p>
                    </div>
                </div>
                </div>
                <div className="w-full flex justify-around py-10 h-auto items-start bg-white shadow-md rounded-md">
                <div className="w-[20%] flex flex-col h-35 justify-center py-5 items-start bg-gray-100 rounded-md gap-5">
                <p className="text-gray-900 text-xl px-5">Total Categories</p>
                <div className="text-4xl font-semibold text-gray-900 px-5">{loadingCategories ? 
                <Spinner/> : categories?.length}</div>
                </div>
                <div className="w-[20%] flex flex-col h-35 justify-center py-5 items-start bg-gray-100 rounded-md gap-5">
                <p className="text-gray-900 text-xl px-5">Total Activities</p>
                <div className="text-4xl font-semibold text-gray-900 px-5">{loadingActivities ? 
                <Spinner/> : activities?.length}</div>
                </div>
                <div className="w-[20%] flex flex-col h-35 justify-center py-5 items-start bg-gray-100 rounded-md gap-5">
                <p className="text-gray-900 text-xl px-5">Total Transactions</p>
                <div className="text-4xl font-semibold text-gray-900 px-5">{loadingTransactions ? 
                <Spinner/> : transactions?.length}</div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard