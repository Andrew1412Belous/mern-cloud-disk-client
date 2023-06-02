import { useDispatch } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../../actions/user'

import './profile.scss'

const Profile = () => {
  const dispatch = useDispatch()

  function changeHandler(e) {
    const file = e.target.files[0]

    if (!file.type.indexOf('image')) {
      if (file.size > 2097152) {
        alert('Image too large\nMaximum size 2MB')
      } else {
        dispatch(uploadAvatar(file))
      }
    } else {
      alert('Invalid type file')
    }
  }

  return (
    <div className='profile'>
      <button className='profile__btn' onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>
      <input accept="image/*" onChange={e => changeHandler(e)} type="file" placeholder="Upload avatar"/>
    </div>
  );
};

export default Profile;
