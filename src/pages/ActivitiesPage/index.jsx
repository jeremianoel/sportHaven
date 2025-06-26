import { useState,useEffect } from 'react'
import NavBar from "../../components/NavBar";
import Swim from "../../assets/Grass.png"
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';
import { useActivites } from '../../hooks/useActivities';
import { useLocations } from '../../hooks/useLocations';
import { useAllCategories } from '../../hooks/useAllCategories';
import Spinner from '../../components/Spinner';

const ActivitiesPage = () => {
  const {locations,loadingLocations} = useLocations()  
  const {activities,loadingActivities} = useActivites()
  const {categories,loadingCategories} = useAllCategories()
  const [city,setCity] = useState('')
  const [sportCategory, setSportCategory] = useState('')
  const [search,setSearch] = useState('')
  const [reset, setReset] = useState(false)
  const [slot, setSlot] = useState(false)
  const [searchBtn, setSearchBtn] = useState({
    search: search,
    city: city,
    sportCategory: sportCategory,
    slot: slot
  })

  const handleReset = () => {
    setSearch('');
    setSportCategory('');
    setCity('');
    setSlot('');
    setSearchBtn({
      search: '',
      city: '',
      sportCategory: '',
      slot: ''
    });
  }

  const resetStatus = () => {
    if(search || city || sportCategory || slot) {
      setReset(true)
    } else setReset(false)
  }

  useEffect(()=>{
    resetStatus()
  },[search,city,sportCategory,slot])

  const handleSearch = () => {
    setSearchBtn({
      search: search,
      city: city,
      sportCategory: sportCategory,
      slot: slot
    })
  }

  return(
    <>
      <div className="h-auto pt-38 bg-cover bg-center" style={{backgroundImage: `url(${Swim})`}}>
        <NavBar/>
        <div className="flex flex-col items-center justify-center gap-8 py-10 px-4 text-gray-700">
          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">Sport Activities</h1>
          <div className='w-full lg:w-[85%] flex flex-col md:flex-row flex-wrap gap-4 rounded-xl bg-white px-6 py-4 justify-between items-center'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='w-full md:w-auto flex-1 border-1 focus:outline-emerald-500 border-gray-400 px-3 py-2 rounded-sm placeholder:text-gray-400' placeholder='Search Activity'/>

            <div className="relative w-full md:w-48">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2 border-1 border-gray-400 rounded-sm px-3 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Choose a City</option>
                {!loadingLocations ? locations.map((location) => (
                  <option key={location.city_id} value={location.city_id}>{location.city_name}</option>
                )): <option disabled value={''}>Loading locations...</option>}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
                ▼
              </div>
            </div>

            <div className="relative w-full md:w-48">
              <select
                value={sportCategory}
                onChange={(e) => setSportCategory(e.target.value)}
                className="w-full py-2 border-1 border-gray-400 rounded-sm px-3 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Choose a Category</option>
                {!loadingCategories ? categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                )): <option disabled value={''}>Loading categories...</option>}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
                ▼
              </div>
            </div>

            <div className="relative w-full md:w-48">
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value === 'true')}
                className="w-full py-2 border-1 border-gray-400 rounded-sm px-3 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">All Activities</option>
                <option value='true'>Available Slots</option>                
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
                ▼
              </div>
            </div>

            <button onClick={handleSearch} className='w-full md:w-24 text-white bg-emerald-500 py-2 rounded-sm hover:cursor-pointer'>Search</button> 
            <button disabled={!reset} onClick={handleReset} className={`w-full md:w-24 text-white py-2 rounded-sm ${reset ? 'hover:cursor-pointer bg-gray-900' : 'bg-gray-400 cursor-not-allowed'}`}>Reset</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 md:px-16 lg:px-28 py-10 place-items-center gap-7 bg-gray-50">
        {(() => {
          const filtered = activities.filter((activity) => {
            const matchesTitle = activity.title.toLowerCase().includes(searchBtn.search.toLowerCase());
            const matchesCity = searchBtn.city === '' || activity.city_id === Number(searchBtn.city);
            const matchesCategory = searchBtn.sportCategory ? activity.sport_category_id === Number(searchBtn.sportCategory) : true;
            const matchesSlot = searchBtn.slot ? activity.participants?.length < activity.slot : true;

            return matchesTitle && matchesCity && matchesCategory && matchesSlot;
          });

          if (loadingActivities) {
            return <div className="text-center col-span-full text-gray-900 text-xl my-20"><Spinner/></div>;
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
              <div key={activity.id} className='bg-white flex flex-col w-full sm:w-11/12 md:w-80 shadow-md px-4 py-3 h-auto rounded-2xl gap-5'>
                <p className='font-bold text-lg mb-1'>{activity.title}</p>
                <div className="flex text-gray-600 flex-col gap-2 text-sm">
                  <div className="flex">
                    <p className="w-20">Date</p>
                    <p className='font-semibold'> {formattedDate}</p>
                  </div>
                  <div className="flex">
                    <p className="w-20">Time</p>
                    <p className='font-semibold'> {formattedStartTime} - {formattedEndTime}</p>
                  </div>
                  <div className="flex">
                    <p className="w-20">Address</p>
                    <p className="break-words w-60 font-semibold"> {activity.address}</p>
                  </div>
                  <div className="flex">
                    <p className="w-20">Price</p>
                    <p className='font-semibold'> Rp{formattedPrice}</p>
                  </div>
                  <div className="flex">
                    <p className="w-20">Availability</p>
                    {activity.participants?.length >= activity.slot ? <p className='text-emerald-500 font-semibold'> Fully Booked</p>
                    : <p className='font-semibold'> {activity.slot - activity.participants?.length} slot</p>}                
                  </div>
                </div>
                <Link to={`/activities/${activity.id}`} className='text-center hover:cursor-pointer mb-1 w-auto border-2 border-gray-900 hover:bg-white hover:text-gray-900 duration-200 rounded-sm py-2 text-sm bg-gray-900 text-emerald-500'>Book Now</Link>
              </div>
            )})})()}
      </div>
      <Footer/>
    </>
  ) 
}

export default ActivitiesPage
