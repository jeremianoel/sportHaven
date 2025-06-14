import axios from 'axios';
import { useState,useEffect } from 'react'
import NavBar from "../../components/NavBar";
import Swim from "../../assets/Grass.png"
import Footer from "../../components/Footer";
import { matches } from 'lodash';

  const ActivitiesPage = () => {

  const [activities, setActivities] = useState([])
  const [loadingActivities, setLoadingActivites] = useState(true);
  const [locations, setLocations] = useState([])
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [city,setCity] = useState('')
  const [sportCategory, setSportCategory] = useState('')
  const [search,setSearch] = useState('')
  const [searchBtn, setSearchBtn] = useState({
    search: search,
    city: city,
    sportCategory: sportCategory
  })
  
  const getActivities = async () => {     
  // try {
  //   const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities`);
  //   console.log(res.data.result.data);
  //   setActivities(res.data.result.data);
  // }
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
    alert('error');
    console.log(err)
  }
  finally {
    setLoadingActivites(false);
  }
};

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
      alert('Error fetching cities');
      console.log(err);
    }finally {
    setLoadingLocations(false);
  }
  };

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
      alert('Error fetching categories');
      console.log(err);
    }finally {
    setLoadingCategories(false);
  }
  };

useEffect(() => {
    getActivities(),
    getLocations(),
    getCategories()
  },[])

  const handleSearch = () => {
    setSearchBtn({
    search: search,
    city: city,
    sportCategory: sportCategory
    })
  }
  
    return(
        <>
        <div className="container h-100 pt-38 bg-cover bg-center" style={{backgroundImage: `url(${Swim})`}}>
        <NavBar/>
        <div className="mt-7 flex flex-col items-center justify-center gap-13 text-gray-900">
            <h1 className="text-4xl font-semibold text-white">Sport Activities</h1>
            <div className='w-[85%] h-18 rounded-xl bg-cover bg-center bg-white flex items-center justify-around' >
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='w-75 border-1 h-8 focus:outline-emerald-500 border-gray-500 px-3 py-4 rounded-sm placeholder:text-gray-500' placeholder='Search Activity'/>
            <div className="relative w-75">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-75 h-10 border-1 border-gray-500 rounded-sm px-3 pr-10 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Choose a City</option>
                {!loadingLocations ? locations.map((location) => (
                <option key={location.city_id} value={location.city_id}>{location.city_name}</option>
                )): <option disabled value={''}>Loading locations...</option>}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                ▼
              </div>
            </div>
            <div className="relative w-75">
              <select
                value={sportCategory}
                onChange={(e) => setSportCategory(e.target.value)}
                className="w-75 h-10 border-1 border-gray-500 rounded-sm px-3 pr-10 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Choose a Category</option>
                {!loadingCategories ? categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
                )): <option disabled value={''}>Loading categories...</option>}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                ▼
              </div>
            </div>
            <button onClick={handleSearch} className='w-30 text-white hover:bg-emerald-300 duration-200 hover:cursor-pointer bg-emerald-500 py-2 rounded-sm'>Search</button> 
            </div>
        </div>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-30 py-10 place-items-center gap-7">
            {(() => {

            const filtered = activities.filter((activity) => {
            const matchesTitle = activity.title.toLowerCase().includes(searchBtn.search.toLowerCase());
            const matchesCity = searchBtn.city === '' || activity.city_id === Number(searchBtn.city);
            const matchesCategory = searchBtn.sportCategory ? activity.sport_category_id === Number(searchBtn.sportCategory) : true;
            return matchesTitle && matchesCity && matchesCategory;
          });

            if (loadingActivities) {
              return <p className="text-center col-span-full text-gray-900 text-xl my-20">Loading activities . . .</p>;
            } 
            if (filtered.length === 0) {
              return <p className="text-center col-span-full text-gray-900 text-xl my-20">No activities found.</p>;
            }            
  
            return filtered.map((activity) => {
            const date = new Date(activity.activity_date);
            const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
            const dayMonth = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
            const year = date.getFullYear();
            const formattedDate = `${weekday}, ${dayMonth} ${year}`;
            const formattedStartTime = activity.start_time?.slice(0, 5); 
            const formattedEndTime = activity.end_time?.slice(0, 5);     
            const formattedPrice = Number(activity.price).toLocaleString('id-ID');
            
            return(
            <div key={activity.id} className='bg-white flex flex-col border-2 border-gray-100 w-95 shadow-lg px-4 py-3 h-auto rounded-2xl gap-5'>
          <p className='font-bold text-lg mb-1'>{activity.title}</p>
          <div className="flex text-gray-600 flex-col gap-2 text-sm">
            <div className="flex">
                <p className="w-20">Date</p>
                <p>: {formattedDate}</p>
            </div>
            <div className="flex">
                <p className="w-20">Time</p>
                <p>: {formattedStartTime} - {formattedEndTime}</p>
            </div>
            <div className="flex">
                <p className="w-20">Address</p>
                <p className="break-words w-60">: {activity.address}</p>
            </div>
            <div className="flex">
                <p className="w-20">Price</p>
                <p>: Rp{formattedPrice}</p>
            </div>
            </div>
            <button className='hover:cursor-pointer mb-1 w-auto border-2 border-gray-900 hover:bg-white hover:text-gray-900 duration-200 rounded-sm py-2 text-sm bg-gray-900 text-emerald-500'>Book Now</button>
          </div>
          )})})()}
        </div>
        <Footer/>
    </>
    ) 
}

export default ActivitiesPage