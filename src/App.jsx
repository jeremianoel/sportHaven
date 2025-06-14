import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ActivitiesPage from './pages/ActivitiesPage'


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<LandingPage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/register'} element={<RegisterPage/>}/>
        <Route path={'/activities'} element={<ActivitiesPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
