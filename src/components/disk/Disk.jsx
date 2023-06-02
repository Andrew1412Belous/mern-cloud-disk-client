import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getFiles, uploadFile } from '../../actions/file'

import FileList from './fileList/FileList'
import Popup from './Popup'
import Uploader from './uploader/Uploader'

import {
  popFromStack,
  setCurrentDir,
  setFileView,
  setPopupDisplay
} from '../../reducers/fileReducer'

import './disk.scss'

const Disk = () => {
  const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState('type')

  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const loader = useSelector(state => state.app.loader)

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])

  function showPopupHandler () {
    dispatch(setPopupDisplay('flex'))
  }

  function backClickHandler () {
    const stack = [...dirStack]

    const backDirId = stack.pop()

    dispatch(setCurrentDir(backDirId))
    dispatch(popFromStack(backDirId))
  }

  function fileUploadHandler (event) {
    const files = [...event.target.files]

    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  function dragEnterHandler (event) {
    event.preventDefault()
    event.stopPropagation()

    setDragEnter(true)
  }

  function dragLeaveHandler (event) {
    event.preventDefault()
    event.stopPropagation()

    setDragEnter(false)
  }

  function dropHandler (event) {
    event.preventDefault()
    event.stopPropagation()

    let files = [...event.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))

    setDragEnter(false)
  }

  if (loader) {
    return (
      <div className='loader'>
        <div className='lds-dual-ring'></div>
      </div>
    )
  }

  return ( !dragEnter ?
    <div className="disk"
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragEnterHandler}>
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>Back</button>
        <button className="disk__create" onClick={() => showPopupHandler()}>Create folder</button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
          <input multiple={true} onChange={event => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
        </div>
        <select value={sort}
                onChange={e => setSort(e.target.value)}
                className='disk__select'>
          <option value="name">By name</option>
          <option value="type">By type</option>
          <option value="date">By date</option>
        </select>
        <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
        <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
      </div>
      <FileList/>
      <Popup/>
      <Uploader/>
    </div>
    :
    <div className="drop-area"
         onDrop={dropHandler}
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragEnterHandler}>
      Drag files here
    </div>
  );
};

export default Disk;
