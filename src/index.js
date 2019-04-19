const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
// const ipc = electron.remote
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notify-btn')
let price = document.getElementById('price')
let targetPrice = document.getElementById('target-price')

function getBTC() {
  axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
    .then(({data}) => {
      // console.log(res)
      const cryptos = data.USD
      price.innerHTML = '$' + cryptos
    });
}

getBTC()
setInterval(getBTC, 30000)

notifyBtn.addEventListener('click', (e) => {
  // const modalPath = path.join('file://', __dirname, 'add.html')
  const modalPath = "https://github.com/electron/electron-api-demos"
  let win = new BrowserWindow({frame: true, transparent: true, alwaysOnTop: true, width: 400, height: 200})
  win.setMenuBarVisibility(false)
  win.on('close', () => {win = null})
  win.loadURL(modalPath)
  win.show()
  // win.maximize()
})

ipc.on('targetPriceVal', (event, arg) => {
  const targetPriceVal = Number(arg)
  console.log('hello')
  targetPrice.innerHTML = '$' + targetPriceVal
})
