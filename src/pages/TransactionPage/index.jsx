import axios from 'axios';
import { useState,useEffect } from 'react'
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useActivityDetail } from '../../hooks/useActivityDetail'
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdTime } from "react-icons/io";

const TransactionPage = () => {

    const token = localStorage.getItem('token')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {detail} = useActivityDetail()
    const [payments, setPayments] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('')
    const [image, setImage] = useState('')
    const [valid, setValid] = useState(false)
    const date = new Date(detail.activity_date);
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const dayMonth = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${weekday}, ${dayMonth} ${year}`;
    const formattedStartTime = detail.start_time?.slice(0, 5); 
    const formattedEndTime = detail.end_time?.slice(0, 5);     
    const formattedPrice = Number(detail.price).toLocaleString('id-ID');
    const [imageURL, setImageURL] = useState('')
    const selectedPayment = payments.find((p) => p.id === Number(paymentMethod));

    const handleValid = () => {
        if(paymentMethod !== '' && image !== '' && message !== 'File is too big!'){
            setValid(true)
        } else setValid(false)  
    }
    
    useEffect(() => {   
        handleValid()
    },[paymentMethod,image,message])

    const confirm = (e) => {
        e.preventDefault()
    }

    const getPayment = async () => {     
    try {
        const res = await axios.get(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/payment-methods`);
        console.log(res.data.result);
        setPayments(res.data.result);
    } catch (err) {
        console.log(err)
    }
    };

    const handleConfirm = async () => {     
    try {
        const payload = {  
        "sport_activity_id": detail.id,
        "payment_method_id": paymentMethod
        }

        const payload2 = {  
        "proof_payment_url": imageURL
        }

        const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/create`,payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: `application/json`
            }
        })
        console.log(res)
        setMessage('Success!')
        const transactionId = res?.data?.result?.id;
        
        const res2 = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/update-proof-payment/${transactionId}`,payload2, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: `application/json`
            }
        })
        console.log(res2)

        setTimeout(() => {
            navigate('/profile')
        }, 1500);
    } catch (err) {
        console.log(err)
    }
    };

    const handleImageURL = async (e) => {     
    try {
        const file = e.target.files[0]
        setImage(file)
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/upload-image`,formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        console.log(res)
        setMessage('')
        setImageURL(res.data.result)
    } catch (err) {
        setMessage('File is too big!')
        console.log(err)
    }
    };

    useEffect(()=>{
    getPayment()
    },[])

    return(
        <>
     <div className="">
        <NavBar/>
        <div className='md:pt-[13%] pt-[43%] w-full bg-gray-50 min-h-screen flex gap-20 items-start justify-center'>
        <div className='w-full bg-gray-50 h-auto md:flex-row flex flex-col gap-20 md:px-0 px-7 items-start justify-center'>
        <div className='w-full md:w-[30%] h-auto flex flex-col gap-5'>
        <div className='w-full shadow-md h-auto py-4 items-center rounded-md bg-gray-900 flex px-5'>
        <h1 className='text-emerald-500 text-2xl font-semibold text-start'>Checkout</h1>
        </div>
        <div className='w-full shadow-md h-auto py-6 rounded-md bg-white flex flex-col px-5 gap-5'>
            <h1 className='text-gray-900 text-xl mb-5 font-semibold text-start'>{detail.title}</h1>
        <div className="flex items-center gap-3">
            <FaCalendarAlt className='text-emerald-500 bg-gray-900 rounded-md p-1 size-8'/>
            <p>{formattedDate}</p>
        </div>
        <div className="flex items-center gap-3">
            <IoMdTime className='text-emerald-500 bg-gray-900 rounded-md p-1 size-8'/>
            <p>{formattedStartTime} - {formattedEndTime}</p>
        </div>
        <div className="flex items-start gap-3">
            <FaLocationDot className='text-emerald-500 bg-gray-900 rounded-md p-1 mt-1 size-8'/>
            <p className="break-words mt-2 w-60">{detail.address}</p>
        </div>
        </div>
        </div>
        <div className='w-full md:w-[23%] shadow-lg mb-20 h-auto rounded-md bg-white flex flex-col md:px-5 px-10 py-4 gap-2'>
        <h1 className='text-gray-900 text-xl font-semibold text-start'>Payment Methods</h1>
        <form onSubmit={(e) => confirm(e)} className='text-md font-semibold flex flex-col gap-2'>
         {payments.map((payment) => (
            <label
            key={payment.id}
            htmlFor={payment.id}
            className='flex items-center justify-start gap-3 border-2 p-2 rounded-md border-gray-200
             hover:border-emerald-500 cursor-pointer'
            >
            <input
                value={payment.id}
                type="radio"
                id={payment.id}
                name='payment'
                onChange={(e) => setPaymentMethod(Number(e.target.value))}
            />
            <img className='w-13' src={payment.image_url} alt={payment.name} />
            <span className='w-full'>{payment.name}</span>
            </label>
         ))}
         
         {selectedPayment && selectedPayment.virtual_account_name && (
            <>
          <p className='text-gray-400 text-sm font-normal mt-2'>Please transfer to the following virtual account:</p>  
        <div className='flex gap-3 text-sm font-normal justify-start items-center'>
            <img src={selectedPayment.image_url} className='w-15'/>
            <div className='flex flex-col gap-2'>
            <p>{selectedPayment.virtual_account_name}</p>   
            <p>{selectedPayment.virtual_account_number}</p>
            </div>   
        </div>
        <p className='text-gray-400 text-sm font-normal mt-2'>Please upload proof of payment:</p>
        <div className="w-full text-sm font-normal">
        <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageURL(e)}
            className="border border-gray-200 file:p-1 w-full
                    file:bg-gray-200 file:text-black rounded-md file:font-normal
                    file:cursor-pointer file:rounded-none"
        />
        </div>
        <h1 className='text-end mt-3 text-gray-400'>Total Fee : <span className='text-black'>Rp{formattedPrice}</span></h1>
        </>
        )}
        

         
         <button onClick={handleConfirm} disabled={!valid} type='submit' className={`text-center
            mt-3  border-3  w-full font-bold duration-200 rounded-sm py-2
              text-sm  text-white ${valid ? `hover:text-emerald-500 border-emerald-500
            hover:bg-white bg-emerald-500 hover:cursor-pointer hover:border-emerald-500
            ` : `bg-gray-500 border-gray-500 cursor-not-allowed`}`}>Confirm</button>
            <div className={`w-full text-md text-center items-center font-semibold`}>
                  <p className={`${message === 'Success!' ? 'text-emerald-500' : 'text-red-500'}`}>{message}</p>
            </div>   
        </form>
        </div>
        </div>
        </div>
        <Footer/>
        </div>
        </>
    )
}

export default TransactionPage