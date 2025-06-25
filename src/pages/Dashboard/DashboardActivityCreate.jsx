import { useState, useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import axios from "axios"
import toast from "react-hot-toast"
import {useAllCategories} from "../../hooks/useAllCategories"
import { useLocations } from "../../hooks/useLocations"
import { useNavigate } from "react-router-dom"

const DashboardActivityCreate = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {categories} = useAllCategories()
    const {locations,loadingLocations} = useLocations()
    const [sportCategoryId, setSportCategoryId] = useState('')
    const [cityId, setCityId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [slot, setSlot] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [activityDate, setActivityDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [mapURL, setMapURL] = useState('https://maps.app.goo.gl/h1AV4bfB2cojJMxK7')

    const createActivity = async (e) => {
        e.preventDefault();
        try {
           const payload = {
                "sport_category_id": sportCategoryId,
                "city_id": cityId,
                "title": title,
                "description": description,
                "slot": slot,
                "price": price,
                "address": address,
                "activity_date": activityDate,
                "start_time": startTime,
                "end_time": endTime,
                "map_url": mapURL
            }
           const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/create`,payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res)
            toast.success('Activity Created!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
            setTimeout(() => {
                navigate('/dashboard/activities')
            }, 1500);
            
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message, {
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
        <div className="flex flex-col h-auto bg-white shadow-md rounded-md justify-center items-center w-full m-3 gap-5">
            <form onSubmit={(e) => createActivity(e)} className='flex-col flex items-center text-sm gap-2 py-15'>
              <h1 className='font-bold text-3xl mb-3 text-gray-900 text-start w-full'>Create Activity</h1>
              <label className='text-start text-gray-900 w-full'>Title</label>
              <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Title'/>
              <label className='text-start text-gray-900 w-full'>City</label>
              <div className="relative w-full">
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                className="w-full h-10 border-1 border-gray-300 rounded-sm px-3 pr-10 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Select City</option>
                {loadingLocations ? <option disabled value="">Loading cities...</option> : locations.map((location) => (
                    <option key={location.city_id} value={location.city_id}>{location.city_name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                ▼
              </div>
            </div>
            <label className='text-start text-gray-900 w-full'>Sport Category</label>
              <div className="relative w-full">
              <select
                value={sportCategoryId}
                onChange={(e) => setSportCategoryId(e.target.value)}
                className="w-full h-10 border-1 border-gray-300 rounded-sm px-3 pr-10 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                ▼
              </div>
            </div>
              <label className='text-start text-gray-900 w-full'>Description</label>
              <input value={description} type="text" onChange={(e) => setDescription(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Description'/>
              <label className='text-start text-gray-900 w-full'>Address</label>
              <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Address'/>
              <label className='text-start text-gray-900 w-full'>Slots</label>
              <input value={slot} type="number" onChange={(e) => setSlot(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Slots'/>
              <label className='text-start text-gray-900 w-full'>Price</label>
              <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Price'/>
              <label className='text-start text-gray-900 w-full'>Date</label>
                <input
                type="date"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                className='w-100 h-8 focus:outline-emerald-500 border border-gray-300 px-3 py-4 rounded-sm'
                placeholder='Select Date'
                />
                <label className='text-start text-gray-900 w-full'>Start Time</label>
                <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className='w-100 h-8 focus:outline-emerald-500 border border-gray-300 px-3 py-4 rounded-sm'
                />
                <label className='text-start text-gray-900 w-full'>End Time</label>
                <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className='w-100 h-8 focus:outline-emerald-500 border border-gray-300 px-3 py-4 rounded-sm'
                />
            <label className='text-start text-gray-900 w-full'>Map URL</label>
              <input value={mapURL} type="text" onChange={(e) => setMapURL(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Map URL'/>
              <button
              type='submit'
              className={`w-100 py-3 bg-emerald-500 text-white hover:text-emerald-500 hover:bg-white hover:border-emerald-500
              hover:cursor-pointer rounded-full mt-4 duration-300 border-3`}>Submit</button>
             </form>
        </div>
        </div>
    )
}

export default DashboardActivityCreate
