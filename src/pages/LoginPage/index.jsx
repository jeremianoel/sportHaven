import { useState, useEffect } from 'react';
import Swim from '../../assets/swim.jpeg';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prevPage = searchParams.get("prevPage") || "/";

  const handleValid = () => {
    setValid(email.trim() !== '' && password.trim() !== '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json' };
    const API = 'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login';
    const API2 = 'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/me';
    const payload = { email, password };

    try {
      const response = await axios.post(API, payload, { headers });
      const token = response.data.data.token;

      console.log('Successfully logged in ✓', response);
      setMessage(response.data.message.replace(/\.$/, ''));
      localStorage.setItem('token', token);

      const response2 = await axios.get(API2, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userRole = response2.data.data.role;
      localStorage.setItem('role', userRole);
      setRole(userRole);

      setTimeout(() => {
        navigate(userRole === 'admin' ? '/dashboard' : prevPage, { replace: true });
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        if (error.response) {
          console.error("Error detail:", error.response.data.message);
          setMessage(error.response.data.message.replace(/\.$/, ''));
        } else {
          setMessage('Something went wrong');
        }
      }, 500);
    }
  };

  useEffect(() => {
    handleValid();
  }, [email, password]);

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div
        className="hidden md:flex md:w-[57%] min-h-[50vh] md:min-h-screen flex-col justify-end bg-center bg-cover"
        style={{ backgroundImage: `url(${Swim})` }}
      >
        <div className="bg-gray-900/85 h-[27%] flex flex-col items-center justify-center gap-3 p-6">
          <p className="w-100 leading-7 text-white text-xl text-start">
            “You can't put a limit on anything. The more you dream, the farther you get.”
          </p>
          <p className="w-100 text-start leading-7 text-emerald-500 font-semibold text-xl">
            — Michael Phelps
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full md:w-[43%] min-h-screen justify-center px-6 py-12">
        <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col text-md gap-4">
          <h1 className="font-bold text-4xl text-gray-900">Login</h1>
          <label className="text-gray-900">Email Address</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-3 py-3 rounded-sm focus:outline-emerald-500"
            placeholder="Enter Email Address"
          />
          <label className="text-gray-900">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-3 py-3 rounded-sm focus:outline-emerald-500"
            placeholder="Enter Password"
          />
          {message && (
            <div
              className={`mt-2 text-center py-2 rounded-sm ${
                message === 'User login successfully'
                  ? 'bg-emerald-100 text-emerald-500'
                  : 'bg-red-100 text-red-500'
              }`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={!valid}
            className={`py-3 rounded-full mt-4 duration-300 border-1 w-full text-lg ${
              valid
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer'
                : 'bg-gray-200 border-gray-400 text-gray-400 cursor-not-allowed'
            }`}
          >
            Login
          </button>
          <div className="relative w-full mt-3 text-sm">
            <Link
              to="/"
              className="absolute left-0 text-gray-500 hover:text-gray-300 duration-200"
            >
              ← Back
            </Link>
            <p className="text-center text-gray-900">
              No account yet?{' '}
              <Link
                to={`/register?prevPage=${prevPage}`}
                className="text-emerald-500 hover:text-emerald-300 duration-200"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
