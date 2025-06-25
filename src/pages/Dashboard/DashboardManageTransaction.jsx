import { useState, useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"

const DashboardManageTransaction = () => {
    const {id} = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [detail, setDetail] = useState([])
    const date = new Date(detail.order_date);
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const dayMonth = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${weekday}, ${dayMonth} ${year}`;

    const getTransaction = async () => {     
    try {
    const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(res);
    setDetail(res.data.result)
  }
  catch (err) {
    console.log(err)
  }
};
    useEffect(() => {
        getTransaction()
    },[])

    const approveTransaction = async () => {     
    try {
    const payload = {
    "status": "success"
    }   
    const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/update-status/${id}`,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(res);
    toast.success(`Transaction approved!`)
    setTimeout(() => {
        navigate('/dashboard/transaction')
    }, 1500);
  }
  catch (err) {
    console.log(err)
    toast.error(`Failed to proceed!`)
  }
};

const cancelTransaction = async () => {     
    try {
    const payload = {
    "status": "success"
    }   
    const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/cancel/${id}`,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(res);
    toast.success(`Transaction cancelled!`)
    setTimeout(() => {
        navigate('/dashboard/transaction')
    }, 1500);
  }
  catch (err) {
    console.log(err)
    toast.error(`Failed to proceed!`)
  }
};

    return (
        <div className="flex bg-gray-100 ml-[17%] min-h-screen">
            <DashboardNavBar />
        <div className="flex flex-col h-fit bg-white shadow-md rounded-md justify-center items-center w-full m-3 gap-5">
            <div className="flex flex-col gap-10 py-15">
            <h1 className='font-bold text-3xl mb-3 text-gray-900 text-center w-full'>Transaction Details</h1>
            {detail?.length !== 0 ? 
            <div className="flex text-gray-900 flex-col gap-5 text-md bg-gray-50 rounded-md px-5 py-5">
            <div className="flex gap-8">
                <p className="w-35">Title</p>
                <p className="break-words font-semibold w-150"> {detail.transaction_items?.sport_activities?.title}</p>
            </div>
            <div className="flex gap-8">
                <p className="w-35">Invoice ID</p>
                <p className="font-semibold w-150"> {detail.invoice_id}</p>
            </div>
            <div className="flex gap-8">
                <p className="w-35">Date</p>
                <p className="font-semibold w-150"> {formattedDate}</p>
            </div>
            <div className="flex gap-8 items-start">
            <p className="w-35">Proof of Payment</p>
            {detail.proof_payment_url ? (
                <img
                src={detail.proof_payment_url}
                alt="Proof of Payment"
                className="w-60 h-auto object-cover rounded-md border border-gray-300"
                />
            ) : (
                <p className="font-semibold w-150">No image uploaded.</p>
            )}
            </div>
            <div className="flex gap-8">
                <p className="w-35">Status</p>                
                <p
                    className={`${detail.status === 'pending'
                    ? 'text-amber-500'
                    : detail.status === 'success'
                    ? 'text-emerald-500'
                    : 'text-red-500'
                    } font-semibold`}
                >
                    {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
                </p>                
            </div>
            <div className="flex gap-20 w-full py-2 justify-center">
                    <button
                        disabled={detail.status === 'success' || detail.status === 'cancelled'}
                        onClick={() => approveTransaction()}
                        className={`${detail.status === 'success' || detail.status === 'cancelled' ?
                             'cursor-not-allowed bg-gray-500' : 'bg-emerald-500 hover:bg-emerald-300 hover:cursor-pointer'} px-2 py-1 text-center  text-white rounded-md  duration-100`}
                    >
                        Approve
                    </button>
                    <button
                        disabled={detail.status === 'success' || detail.status === 'cancelled'}
                        onClick={() => cancelTransaction()}
                        className={`${detail.status === 'success' || detail.status === 'cancelled' ?
                             'cursor-not-allowed bg-gray-500' : 'bg-red-500 hover:bg-red-300 hover:cursor-pointer'} px-2 py-1 text-center  text-white rounded-md  duration-100`}
                    >
                        Cancel
                    </button>
            </div>
            </div> : 
            <div className="flex w-full justify-center"><Spinner/></div>
            }
            </div>
        </div>
        </div>
    )
}

export default DashboardManageTransaction
