export default (size) => {
  if (size > 1024 * 1024 * 1024) {
    return (parseFloat(size / 1024 * 1024 * 1024).toFixed(1) + 'Gb')
  } else if (size > 1024 * 1024) {
    return (parseFloat(size / (1024 * 1024)).toFixed(1) + 'Mb')
  } else if (size > 1024) {
    return (parseFloat(size / (1024)).toFixed(1) + 'Kb')
  } else {
    return size + 'B'
  }
}
