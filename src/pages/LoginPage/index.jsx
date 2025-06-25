import { useState, useEffect } from 'react'
import Swim from '../../assets/swim.jpeg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

function LoginPage() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const prevPage = searchParams.get("prevPage") || "/";
  const handleValid = () =>{
    if(email.trim() !== '' && password.trim() !== '')
    {
      setValid(true)
    }else setValid(false)
  }

  const handleLogin = async (e) => {
        e.preventDefault();
        const headers = {
                    'Content-Type': 'application/json'
                }
        const API = 'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login'
        const API2 = 'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/me'
        const payload = {
        email: email,
        password: password
    }   
        try {
            const response = await axios.post(API, payload, 
            {
                headers: headers
            });
            const token = response.data.data.token
            
            console.log('Successfuly logged in ✓',response);
            setMessage(response.data.message.replace(/\.$/, ''));
            localStorage.setItem('token', token);

            const response2 = await axios.get(API2, 
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            const userRole = response2.data.data.role;
            localStorage.setItem('role', userRole);
            setRole(userRole);

            setTimeout(() => {
            if (userRole === 'admin') {
                navigate('/dashboard', { replace: true });
            } else {
                navigate(prevPage || '/', { replace: true });
            }
        }, 1500);

        } catch (error){
            if(error.response){
                setTimeout(() => {
                    console.error("Error detail:", error.response.data.message);
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
  },[email,password])


  return (
    <>
      <div className='container flex flex-col'>
        <div className='flex'>
        <div className="w-[57%] min-h-screen flex flex-col justify-end bg-center bg-cover" style={{backgroundImage: `url(${Swim})`}}>
          <div className='bg-gray-900/85 h-[27%] flex flex-col items-center justify-center gap-3'>
            <p className='w-100 leading-7 text-white text-xl'>“You can't put a limit on anything. The more you dream, the farther you get.”</p>
            <p className='w-100 text-start leading-7 text-emerald-500 font-semibold text-xl'>— Michael Phelps</p>
          </div>
          </div>
          <div className='flex flex-col items-center w-[43%] min-h-screen justify-center'>
             <form onSubmit={(e) => handleLogin(e)} className='flex-col flex items-center text-md gap-4'>
              <h1 className='font-bold text-4xl text-gray-900 text-start w-full'>Login</h1>
              <label className='text-start text-gray-900 w-full'>Email Address</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} className='w-100 border-1 focus:outline-emerald-500 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Email Address'/>
              <label className='text-start text-gray-900 w-full'>Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} className='w-100 focus:outline-emerald-500 border-1 border-gray-300 px-3 py-4 rounded-sm' placeholder='Enter Password'/>
              {message && 
                <div className={`w-100 flex mt-4 justify-center ${message === 'User login successfully' ? 'bg-emerald-100 text-emerald-500' : 'bg-red-100 text-red-500' }  py-2 rounded-sm`}>
                  <p>{message}</p>
                </div>
              }
              <button
              type='submit'
              disabled={!valid}
              className={`w-100 py-4 rounded-full mt-4 duration-300 border-1 ${
                valid
                  ? 'bg-emerald-500 hover:bg-emerald-300 text-white hover:cursor-pointer'
                  : 'bg-gray-200 border-gray-400 text-gray-400'
              }`}>Login</button>
              <div className='flex w-full mt-2 relative'>
                <Link to='/' className='absolute left-0 text-md text-gray-500 hover:text-gray-300 hover:cursor-pointer duration-200'>
                 ← Back
                </Link>
                <div className='w-full text-center'>
                <p className='text-gray-900'>No account yet? <span className='text-emerald-500 hover:text-emerald-300 duration-200 hover:cursor-pointer'><Link to={`/register?prevPage=${prevPage}`}>Register here</Link></span></p>
                </div>
              </div>
             </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
