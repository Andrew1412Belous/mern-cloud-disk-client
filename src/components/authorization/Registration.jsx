import { useState } from 'react'
import { registration } from '../../actions/user'

import Input from '../../utils/input/Input'

import './authorization.scss'

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
      <div className='authorization'>
        <div className="authorization__header">Registration</div>
        <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
        <button className="authorization__btn" onClick={() => registration(email, password)}>Create account</button>
      </div>
  );
};

export default Registration;
