import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'

import { useState } from 'react'
import { getFiles, searchFile } from '../../actions/file'
import { showLoader } from '../../reducers/appReducer'
import { API_URL } from '../../confis'

import Logo from '../../assets/img/navbar-logo.svg'
import avatarLogo from '../../assets/img/avatar.svg'

import './navbar.scss'

const Navbar = () => {
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)

  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
  const isAuth = useSelector(state => state.user.isAuth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo

  function searchChangeHandler (e) {
    setSearchName(e.target.value)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    dispatch(showLoader())

    if (e.target.value.length) {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFile(value))
      }, 500, e.target.value))
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  return (
      <div className="navbar">
        <div className="container">
          <img src={Logo} alt="" className="navbar__logo" onClick={() => navigate('/')}/>
          <div className="navbar__header" onClick={() => navigate('/')}>MERN CLOUD</div>
          {isAuth && <input
            value={searchName}
            onChange={e => searchChangeHandler(e)}
            className='navbar__search'
            type="text"
            placeholder="File name..."/>}
          {!isAuth && <div className="navbar__login"><NavLink to="/login">Sign in</NavLink></div>}
          {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Sign up</NavLink></div>}
          {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Logout</div>}
          {isAuth && <NavLink to='/profile'>
            <img className="navbar__avatar" src={avatar} alt="avatar logo"/>
          </NavLink>}
        </div>
      </div>
  );
};

export default Navbar;
