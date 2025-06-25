import { Navigate} from "react-router-dom";

const ProtectedAuthentication = ({ children }) => {
    const role = localStorage.getItem('role')

    if(role === 'user'){
        return <Navigate to={'/'}/>
    }

    if(role === 'admin'){
        return <Navigate to={'/dashboard'}/>
    }

    return children
}

export default ProtectedAuthentication