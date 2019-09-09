const {app, BrowserWindow, ipcMain} = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./renderer/index.html')
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  ipcMain.on('add-music-window', (event, arg) => {
    const addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
        nodeIntegration: true
      },
      parent:mainWindow
    })
    addWindow.loadFile('./renderer/add.html')
  })

})
