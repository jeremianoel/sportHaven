import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link, useNavigate} from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { AiFillThunderbolt } from "react-icons/ai";
import { useActivityDetail } from '../../hooks/useActivityDetail'
import { useState } from "react";

  const ActivityDetailPage = () => {
    const {detail} = useActivityDetail()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const date = new Date(detail.activity_date);
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const dayMonth = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${weekday}, ${dayMonth} ${year}`;
    const formattedStartTime = detail.start_time?.slice(0, 5); 
    const formattedEndTime = detail.end_time?.slice(0, 5);     
    const formattedPrice = Number(detail.price).toLocaleString('id-ID');
    const [message, setMessage] = useState('')

    const handleNoToken = () => {
        setMessage('You need to login first')
        setTimeout(() => {
        navigate(`/transaction/${detail.id}`)
        }, 1500);
    }
    return(
        <>
        <div className="min-h-screen pt-38 bg-gray-900">
        <NavBar/>
        {detail &&
        <>
        <div key={detail.id} className="mt-7 mb-10 flex flex-col lg:flex-row px-5 lg:px-20 gap-6">
            <div className='w-full lg:w-[35%] flex flex-col gap-4'>
             <Link to='/activities' className='text-md text-white hover:cursor-pointer self-start'>
                 ← Back
             </Link>   
            <h1 className="text-3xl font-semibold text-white">{detail.title}</h1>
            <hr className="border-0 h-1 bg-emerald-500 w-full transform -skew-x-50" />
            <p className='text-gray-900 text-lg bg-white w-fit rounded-lg px-2 py-1'>{detail.sport_category?.name || 'Sports'}</p>
            <p className='text-gray-900 text-lg bg-white w-fit rounded-lg px-2 py-1'>Newbie - friendly</p>
            </div>                       
        </div>
        <div className='w-full flex flex-col md:flex-row gap-20 px-5 justify-between items-center h-auto bg-white'>
          <div className='lg:ml-0 rounded-lg bg-white w-full lg:w-[60%] h-auto my-20 shadow-md border-1 border-gray-200 px-10 py-10'>
            <div className='flex flex-col gap-10'>
            <p className='text-gray-900 text-md w-auto leading-7'>This sport activity is designed to provide an enjoyable and 
                healthy experience for people. With supportive facilities and a 
                comfortable atmosphere, each session offers the perfect opportunity to improve fitness, meet new people, 
                and have a good time. Suitable for both beginners and experienced participants.</p>
            <div className="flex text-gray-900 flex-col gap-4 text-md">
            <div className="flex gap-8">
                <p className="w-20">Date</p>
                <p className="font-semibold"> {formattedDate}</p>
            </div>
            <div className="flex gap-8">
                <p className="w-20">Time</p>
                <p className="font-semibold"> {formattedStartTime} - {formattedEndTime}</p>
            </div>
            <div className="flex gap-8">
                <p className="w-20">Address</p>
                <p className="break-words w-60 font-semibold"> {detail.address}</p>
            </div>
            <div className="flex gap-8">
                <p className="w-20">Description</p>
                <p className="font-semibold"> {detail.description}</p>
            </div>
            <div className="flex gap-8">
                <p className="w-20">Contact</p>
                <p className="font-semibold"> {detail.organizer?.name} {detail.organizer?.email}</p>
            </div>
            </div>
            </div>
          </div>
          <div className='bg-gray-900 w-full lg:w-[30%] mt-10 lg:mt-0 my-20 h-auto rounded-lg flex flex-col items-center justify-between shadow-md'>
            <div className='flex flex-col items-start w-full ml-10 mt-4 gap-3'>
            <p className='text-white font-semibold text-2xl mb-4 '>Rp{formattedPrice}</p>
            <div className='flex gap-3 justify-start items-center'>
            <CgProfile className='size-8 text-emerald-500'/>
            <p className='text-white text-lg '>{detail.participants?.length ?? 0} participants</p>
            </div>
            <div className='flex gap-3 justify-start mb-10 items-center'>
            {(detail.participants?.length ?? 0) < (detail.slot) ? 
            
            <div className='flex gap-3 justify-start items-center'>
            <AiFillThunderbolt className='size-8 text-emerald-500'/>
            <p className='text-white text-lg '>{detail.participants?.length ?? 0}/{detail.slot} Available Slot</p>
            </div>
            : <p className='text-red-500 bg-red-100 px-4 py-1 rounded-sm text-lg'>Fully Booked</p>}
            </div>
            </div>
            
            {detail.participants?.length < detail.slot ? (token ? <Link to={`/transaction/${detail.id}`} className='text-center hover:cursor-pointer mb-4 px-20 border-3 hover:text-emerald-500 border-gray-900
            hover:bg-white w-[90%] font-bold duration-200 hover:border-emerald-500 rounded-sm py-2 text-sm bg-emerald-500 text-white'>Join Now</Link> : <><button onClick={handleNoToken} className='text-center hover:cursor-pointer mb-4 px-20 border-3 hover:text-emerald-500 border-gray-900
            hover:bg-white w-[90%] font-bold duration-200 hover:border-emerald-500 rounded-sm py-2 text-sm bg-emerald-500 text-white'>Join Now</button>
            <div className={`w-fit mb-4 text-center items-center font-semibold text-red-500`}>
                  <p>{message}</p>
            </div></>
        )
             : <><button className='text-center cursor-not-allowed mb-4 px-20 border-3 border-gray-900
               w-[90%] font-semibold rounded-sm py-2 text-sm bg-gray-500 text-gray-300'>Join Now</button>
               <p className="text-sm text-white mb-4">You can’t join this activity because it’s full.</p></>
            }
            
          </div>      
        </div>
        </>
        }
        </div>
        <Footer/>
    </>
    ) 
}

export default ActivityDetailPage