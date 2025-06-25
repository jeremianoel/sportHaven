import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import TransactionPage from './pages/TransactionPage'
import ScrollToTop from './components/ScrollToTop'
import { Toaster } from 'react-hot-toast';
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard/Dashboard'
import DashboardTransactionPage from './pages/Dashboard/DashboardTransactionPage'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'
import ProtectedRoutePublic from './components/ProtectedRoutePublic'
import ProtectedAuthentication from './components/ProtectedAuthentication'
import DashboardCategoriesPage from './pages/Dashboard/DashboardCategoriesPage'
import DashboardActivitiesPage from './pages/Dashboard/DashboardActivitiesPage'
import DashboardActivityCreate from './pages/Dashboard/DashboardActivityCreate'
import DashboardActivityEdit from './pages/Dashboard/DashboardActivityEdit'
import DashboardManageTransaction from './pages/Dashboard/DashboardManageTransaction'

function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path={'/'} element={<ProtectedRoutePublic><LandingPage/></ProtectedRoutePublic>}/>
        <Route path={'/login'} element={<ProtectedAuthentication><LoginPage/></ProtectedAuthentication>}/>
        <Route path={'/register'} element={<ProtectedAuthentication><RegisterPage/></ProtectedAuthentication>}/>
        <Route path={'/activities'} element={<ProtectedRoutePublic><ActivitiesPage/></ProtectedRoutePublic>}/>
        <Route path={'/activities/:id'} element={<ProtectedRoutePublic><ActivityDetailPage/></ProtectedRoutePublic>}/>
        <Route path={'/dashboard'} element={<ProtectedRouteAdmin><Dashboard/></ProtectedRouteAdmin>}/>
        <Route path={'/dashboard/transaction'} element={<ProtectedRouteAdmin><DashboardTransactionPage/></ProtectedRouteAdmin>}/>
        <Route path={'/dashboard/categories'} element={<ProtectedRouteAdmin><DashboardCategoriesPage/></ProtectedRouteAdmin>}/>
        <Route path={'/dashboard/activities'} element={<ProtectedRouteAdmin><DashboardActivitiesPage/></ProtectedRouteAdmin>}/>
        <Route path={'/dashboard/activities/create'} element={<ProtectedRouteAdmin><DashboardActivityCreate/></ProtectedRouteAdmin>}/>
        <Route path={'/dashboard/activities/edit/:id'} element={<ProtectedRouteAdmin><DashboardActivityEdit/></ProtectedRouteAdmin>}/>
        <Route path={'/dashboard/transaction/edit/:id'} element={<ProtectedRouteAdmin><DashboardManageTransaction/></ProtectedRouteAdmin>}/>
        <Route path={'/transaction/:id'} element={<ProtectedRoute><TransactionPage/></ProtectedRoute>}/>
        <Route path={'/profile'} element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
