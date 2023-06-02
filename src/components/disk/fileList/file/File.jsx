import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'

import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile } from '../../../../actions/file'

import './file.scss'
import sizeFormat from '../../../../utils/sizeFormat'

const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const fileView = useSelector(state => state.files.view)

  function openDirHandler (file) {
    if (file.type === 'dir') {
      dispatch(setCurrentDir(file._id))
      dispatch(pushToStack(currentDir))
    }
  }

  function downloadClickHandler (event) {
    event.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler (event) {
    event.stopPropagation()

    dispatch(deleteFile(file))
  }

  if (fileView === 'list') {
    return (
      <div className='file' onClick={() => openDirHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
        <div className="file__name">{file.name.length > 50
          ? `${file.name.slice(0, 50)}...`
          : file.name}</div>
        <div className="file__date">{file.date.slice(0,10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== 'dir' &&
          <button className="file__btn file__download" onClick={(event) => downloadClickHandler(event)}>Download</button>}
        <button className="file__btn file__delete" onClick={(event) => deleteClickHandler(event)}>Delete</button>
      </div>
    );
  } else if (fileView === 'plate') {
    return (
      <div className='file-plate' onClick={() => openDirHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' &&
            <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download">download</button>}
          <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">delete</button>
        </div>
      </div>
    );
  }
};

export default File;
