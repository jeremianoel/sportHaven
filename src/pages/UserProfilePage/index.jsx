import axios from 'axios';
import { useState,useEffect } from 'react'
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Foto6 from "../../assets/Foto6.png";

const UserProfilePage = () => {

    const [profiles, setProfiles] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loadingTransactions, setLoadingTransactions] = useState(true)
    const token = localStorage.getItem('token')

    const Spinner = () => {
    return (
        <div className="my-14 animate-spin rounded-full h-8 w-8 border-t-3 border-b-3 border-emerald-500"></div>
    );
    }

    const getUserProfile = async () => {     
    try {
        setLoadingTransactions(true);
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
        setProfiles(res.data.data);

        // const res2 = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/my-transaction`,
        //     {
        //         headers:
        //         {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": 'application/json'
        //         }
        //     }
        // );

        // console.log("res2",res2.data.result.data)
        // setTransactions(res2.data.result.data)

        let page = 1;
        let allResults = [];
        let hasMore = true;

        while (hasMore) {
            const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/my-transaction?page=${page}`,
            {
                headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            }
            );
            const data = res.data.result.data;

            if (data.length === 0) {
            hasMore = false;
            } else {
            allResults = [...allResults, ...data];
            page++;
            }
        }

        console.log("All categories:", allResults);
        setTransactions(allResults);
    } catch (err) {
        console.log(err)
    }
    finally {
    setLoadingTransactions(false);
  }
    };

    useEffect(() =>{
        getUserProfile()
    },[])

    return(
       <>
     <div className="">
        <NavBar/>
        <div className='md:pt-[13%] pt-[43%] w-full bg-gray-50 min-h-screen flex gap-20 items-start justify-center'>
        <div className='md:px-0 px-5 w-full bg-gray-50 h-auto flex flex-col md:flex-row gap-20 items-start justify-center'>
        <div className='md:w-[27%] w-full h-auto flex flex-col gap-5'>
        <div className='w-full shadow-md h-auto py-4 items-center rounded-md bg-gray-900 flex px-5'>
        <h1 className='text-emerald-500 text-xl font-semibold text-start'>My Profile</h1>
        </div>
        <div className='w-full shadow-md h-auto py-6 rounded-md bg-white flex flex-col px-6 gap-5'>
            {profiles &&
            <div className="flex text-gray-900 items-center gap-4 text-md">
             <img src={Foto6} className='rounded-full size-23' />
             <div className='flex flex-col gap-5'>
                  
            <div className="flex">
                <p className="w-20">Name</p>
                <p className="font-semibold break-words mr-2 w-full max-w-[200px] md:max-w-[100%] overflow-hidden">
                {profiles.name}
                </p>
            </div>
            <div className="flex">
                <p className="w-20">Email</p>
                <p className="font-semibold break-words mr-2 w-full max-w-[200px] md:max-w-[100%] overflow-hidden">
                {profiles.email}
                </p>
            </div>
            </div> 
            </div>
        }
        </div>
        </div>
        <div className='flex flex-col w-full md:w-[45%] gap-5'>
        <div className='w-full shadow-md h-auto rounded-md bg-white flex flex-col px-5 py-4 gap-2'>
        <h1 className='text-gray-900 text-xl font-semibold text-start'>Transactions</h1>
        </div>
        <div className='w-full mb-10 h-auto rounded-md bg-gray-50 flex flex-col gap-2'>
        {loadingTransactions ? (
            <div className='w-full shadow-md flex justify-center h-auto rounded-md bg-white'>
            <Spinner/>
            </div>
        ) : transactions.length === 0 ? (
            <p className='w-full mb-2 shadow-md h-auto rounded-md bg-white text-center px-5 py-11'>
            No transactions found.
            </p>
        ) : (
            transactions.map((transaction) => {
            const inputDate = new Date(transaction.order_date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formatted = new Intl.DateTimeFormat('en-GB', options).format(inputDate);
            const formattedPrice = Number(transaction.total_amount).toLocaleString('id-ID');

            return (
                <div key={transaction.id} className='w-full mb-2 shadow-sm h-auto rounded-md bg-white flex flex-col justify-around px-5 py-4 gap-7'>
                <div className='flex gap-5 items-center justify-start'>
                    <p className='font-semibold text-xs md:text-sm'>Sports</p>
                    <p className='text-xs md:text-sm'>{formatted}</p>
                    <p className={`${transaction.status === 'pending'
                        ? 'bg-amber-100 text-amber-500'
                        : transaction.status === 'success'
                        ? 'bg-emerald-100 text-emerald-500'
                        : 'bg-red-100 text-red-500'
                    } px-2 font-semibold text-sm py-1 rounded-md`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </p>
                    <p className='break-words w-full mr-2 max-w-[200px] md:max-w-[100%] overflow-hidden text-gray-400 text-xs md:text-sm'>{transaction.invoice_id}</p>
                </div>
                <div className='flex justify-between gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                    <p className='font-semibold text-md md:text-lg'>{transaction.transaction_items?.sport_activities?.title || '—'}</p>
                    <p className='w-[80%] font-normal text-sm md:text-md text-gray-400'>{transaction.transaction_items?.sport_activities?.address || '—'}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                    <p className='font-normal text-sm md:text-md text-gray-400'>Total Fee</p>
                    <p className='font-semibold text-md md:text-lg'>Rp{formattedPrice}</p>
                    </div>
                </div>
                </div>
            );
            })
        )}
        </div>
        </div>
        </div>
        </div>
        <Footer/>
        </div>
        </>
    )
}

export default UserProfilePage