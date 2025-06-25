import { useState, useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import Spinner from '../../components/Spinner'
import axios from "axios"
import toast from "react-hot-toast"
import { useActivites } from "../../hooks/useActivities"
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom"

const DashboardActivitiesPage = () => {
    const {activities, loadingActivities , refetch} = useActivites()
    const token = localStorage.getItem('token')
    
    const deleteActivity = async (id) => {
        try {
           const res = await axios.delete(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res)
            toast.success('Activity Deleted!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
            refetch()
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message === "Sport Activity cannot be deleted, there are registered participants" ?
                err.response?.data?.message : 'Failed to delete!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
        }
    }

    return (
        <div className="flex bg-gray-100 ml-[17%] min-h-screen">
            <DashboardNavBar />
        <div className="flex flex-col justify-start items-center w-full m-3 gap-5">
            <div className="w-full flex h-auto justify-between items-center bg-white shadow-md rounded-md px-7 py-5">
                <p className="text-black text-3xl font-semibold">Activities</p>
            </div>
            <div className="px-15 w-full flex flex-col justify-around py-10 h-auto items-center bg-white shadow-md rounded-md">
                    <Link to={'/dashboard/activities/create'}  className="w-full flex items-center gap-3 h-10 text-lg 
                    font-semibold hover:text-emerald-500 duration-200 hover:cursor-pointer text-gray-900 py-3 mb-10">
                    <FaPlusCircle className="size-6"/>
                    <p>Add an Activity</p>
                    </Link>
                {loadingActivities ? <Spinner /> : activities?.length === 0 ?
                    <p className="py-10 text-center w-full">No activities found.</p>
                    :
                <table className="w-full text-center table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="border border-gray-300 w-[10%] py-4">No</th>
                            <th className="border border-gray-300 w-[25%]  py-4">Title</th>
                            <th className="border border-gray-300 w-[20%]  py-4">Location</th>
                            <th className="border border-gray-300 w-[15%]  py-4">Price</th>
                            <th className="border border-gray-300 w-[15%]  py-4">Availability</th>
                            <th className="border border-gray-300 w-[15%]  py-4">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => {                         
                        const formattedPrice = Number(activity.price).toLocaleString('id-ID');   
                        return(        
                        <tr key={activity.id}>
                            <td className="border border-gray-300 py-4">{index + 1}</td>
                            <td className="border border-gray-300 py-4">{activity.title}</td>
                            <td className="border border-gray-300 py-4">{activity.city?.city_name}</td>
                            <td className="border border-gray-300 py-4">Rp{formattedPrice}</td>
                            <td className={`border border-gray-300 py-4
                            ${activity.participants?.length >= activity. slot ? 'text-emerald-500 font-semibold' : ''}`}>{activity.participants?.length >= activity. slot ? 
                            'Fully Booked'
                            : activity.slot + ' slot'}                
                            </td>
                        <td className="border border-gray-300 py-4">
                        <div className="flex justify-center gap-5">
                        <>
                            <Link
                                to={`/dashboard/activities/edit/${activity.id}`}
                                className="px-2 py-1 text-center bg-emerald-500 text-white rounded-md hover:bg-emerald-300 hover:cursor-pointer duration-100"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => deleteActivity(activity.id)}
                                className="px-2 py-1 text-center bg-red-500 text-white rounded-md hover:bg-red-300 hover:cursor-pointer duration-100"
                            >
                                Delete
                            </button>
                        </>
                        </div>
                        </td>
                        </tr>
                        )})}
                    </tbody>
                </table>}
            </div>
        </div>
        </div>
    )
}

export default DashboardActivitiesPage
