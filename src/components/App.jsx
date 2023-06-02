import {
  Suspense,
  lazy, useEffect
} from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/user'

import './app.scss'

const Login = lazy(() => import('./authorization/Login'))
const Registration = lazy(() => import('./authorization/Registration'))
const Navbar = lazy(() => import('./navbar/Navbar'))
const Disk = lazy(() => import('./disk/Disk'))
const Profile = lazy(() => import('./profile/Profile'))

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="wrap">
          <Suspense>
            {!isAuth ?
              <Routes>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<Login/>}/>
              </Routes>
              :
              <Routes>
                <Route path='/' element={<Disk/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='*' element={<Disk/>}/>
              </Routes>
            }
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
