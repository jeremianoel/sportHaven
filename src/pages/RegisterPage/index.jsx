import { useState, useEffect } from 'react'
import Soccer from '../../assets/soccer.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [c_password, setC_Password] = useState('')
  const [role, setRole] = useState('')
  const [phone_number, setPhone_Number] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleValid = () =>{
    if(email.trim() !== '' && password.trim() !== '' && name.trim() !== '' && c_password.trim() !== '' && role.trim() !== '')
    {
      setValid(true)
    }else setValid(false)
    
  }

  const handleRegister = async (e) => {
        e.preventDefault();
        const headers = {
                    'Content-Type': 'application/json'
                }
        const API = 'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/register'
        const payload = {
        email: email,
        name: name,
        password: password,
        c_password : c_password,
        role: role,
        phone_number: phone_number
    }   
        try {
            const response = await axios.post(API, payload, 
            {
                headers: headers
            });
            console.log('Successfuly registered',response);
            setMessage(response.data.message.replace(/\.$/, ''));
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error){
            if(error.response){
                setTimeout(() => {
                    console.error("Error detail:", error.response.data.message);
                    if(error.response.data.message === 'Email telah terpakai, silahkan ganti dengan email yang lain')
                    {
                      setMessage('Email has been taken')
                    }else if(error.response.data.message === 'Konfirmasi password harus sama dengan password')
                    {
                      setMessage('Passwords do not match. Please try again')
                    }else 
                    setMessage(error.response.data.message.replace(/\.$/, ''));
                }, 500);
            } else {
                setTimeout(() => {
                    setMessage('Something went wrong');
                }, 500);
            }
        }
    }

  useEffect(()=>{
    handleValid()
  },[email,password,c_password,name,role])


  return (
    <>
      <div className='container flex flex-col'>
        <div className='flex'>
        <div className="w-[57%] min-h-screen flex flex-col justify-end bg-cover" style={{backgroundImage: `url(${Soccer})`}}>
          <div className='bg-gray-900/85 h-[27%] flex flex-col items-center justify-center gap-3'>
            <p className='w-130 leading-7 text-white text-xl'>"Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do."</p>
            <p className='w-130 text-start leading-7 text-emerald-500 font-semibold text-xl'>— Pelé</p>
          </div>
          </div>
          <div className='flex flex-col items-center w-[43%] min-h-screen justify-center'>
             <form onSubmit={(e) => handleRegister(e)} className='flex-col flex items-center text-sm gap-2'>
              <h1 className='font-bold text-3xl mb-3 text-gray-900 text-start w-full'>Register</h1>
              <label className='text-start text-gray-900 w-full'>Email Address</label>
              <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} className='w-100 border-1 h-8 focus:outline-emerald-500 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Email Address'/>
              <label className='text-start text-gray-900 w-full'>Name</label>
              <input value={name} type="text" onChange={(e) => setName(e.target.value)} className='w-100 border-1 h-8 focus:outline-emerald-500 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Name'/>
              <label className='text-start text-gray-900 w-full'>Password</label>
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Password'/>
              <label className='text-start text-gray-900 w-full'>Confirm Password</label>
              <input value={c_password} type="password" onChange={(e) => setC_Password(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Confirm Password'/>
              <label className='text-start text-gray-900 w-full'>Phone Number <span className='text-gray-500'>(Optional)</span></label>
              <input value={phone_number} type="tel" onChange={(e) => setPhone_Number(e.target.value)} className='w-100 h-8 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Phone Number'/>
              <label className='text-start text-gray-900 w-full'>Role</label>
              <div className="relative w-full">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 border-1 border-gray-300 rounded-sm px-3 pr-10 text-sm bg-white focus:outline-green-400 appearance-none">
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
                ▼
              </div>
            </div>
              {message && 
                <div className={`w-100 flex mt-4 justify-center ${message === 'User register successfully' ? 'bg-emerald-500' : 'bg-red-600' } py-2 rounded-sm`}>
                  <p className='text-white'>{message}</p>
                </div>
              }
              <button
              type='submit'
              disabled={!valid}
              className={`w-100 py-3 rounded-full mt-4 duration-300 border-1 ${
                valid
                  ? 'bg-emerald-500 hover:bg-emerald-300 text-white hover:cursor-pointer'
                  : 'bg-gray-200 border-gray-400 text-gray-400'
              }`}>Register</button>  
              <div className='flex w-full mt-2 relative'>
                <Link to='/' className='absolute left-0 text-md text-gray-500 hover:text-gray-300 hover:cursor-pointer duration-200'>
                 ← Back
                </Link>
                <div className='w-full text-center'>
                <p className='text-gray-900'>Have an account? <span className='text-emerald-500 hover:text-emerald-300 duration-200 hover:cursor-pointer'><Link to={'/login'}>Login</Link></span></p>
                </div>
              </div>
             </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
