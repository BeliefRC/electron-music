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
  ipcMain.on('message', (event, arg) => {
    console.log(arg)
    mainWindow.send('reply', 'reply from main')
    // event.sender.send('reply','reply from main')
  })
  mainWindow.loadFile('index.html')
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
})
