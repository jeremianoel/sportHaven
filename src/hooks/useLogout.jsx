import { useNavigate } from "react-router-dom"
import axios from "axios"

export const useLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        const API = 'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/logout'
        try {
            const response = await axios.post(API, {},
            {
                headers: headers
            });
            console.log('Status:',response.data.message);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error){
                setTimeout(() => {
                    console.error("Error detail:", error.response.statusText);
                }, 500);
             }
           }

           return{
            handleLogout
           }
}