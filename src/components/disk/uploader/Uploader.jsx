import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../../reducers/uploadReducer'

import UploadFile from './UploadFile'

import './uploader.scss'

const Uploader = () => {
  const files = useSelector(state => state.upload.files)
  const isVisible = useSelector(state => state.upload.isVisible)
  const dispatch = useDispatch()

  return ( isVisible &&
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Downloads</div>
        <button className="uploader__close" onClick={() => dispatch(hideUploader())}>&#10006;</button>
      </div>
      {files.map(file =>
        <UploadFile key={file.id} file={file}/>
      ).reverse()}
    </div>
  );
};

export default Uploader;
