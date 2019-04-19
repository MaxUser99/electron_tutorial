const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain

const MENU_ACTION = {
  EXIT: () => app.quit(),
  COIN_MARKET_CAP: () => shell.openExternal('http://coinmarketcap.com'),
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('src/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.maximize()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  const menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {label: "Adjust notification value"},
        {
          label: "CoinMarketCap",
          click: MENU_ACTION.COIN_MARKET_CAP
        },
        {type: "separator"},
        {
          label: "Exit",
          click: MENU_ACTION.EXIT
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipc.on('update-notify-value', (event, arg) => {
  console.log("hi  worls")
  win.webContents.send('targetPriceVal', arg)
})