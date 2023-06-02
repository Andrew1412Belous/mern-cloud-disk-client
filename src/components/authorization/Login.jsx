import { useState } from 'react'
import { login } from '../../actions/user'
import { useDispatch } from 'react-redux'

import Input from '../../utils/input/Input'

import './authorization.scss'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  return (
      <div className='authorization'>
        <div className="authorization__header">Authorization</div>
        <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
        <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Sign in</button>
      </div>
  );
};

export default Login;
