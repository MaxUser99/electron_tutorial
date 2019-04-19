const electron = require('electron')
const path = require('path')
// const ipc = electron.remote
const ipc = electron.ipcRenderer
const remote = electron.remote

const closeBtn = document.getElementById('close-btn')

closeBtn.addEventListener('click', closeCurrentWindow)

const updateBtn = document.getElementById('update-btn')

updateBtn.addEventListener('click', () => {
  console.log("this is button click")
  ipc.send('update-notify-value', document.getElementById('notify-val').value)
  // const window = remote.getCurrentWindow()
  // window.close()
  closeCurrentWindow()
})

function closeCurrentWindow() {
  const window = remote.getCurrentWindow()
  window.close()
}
