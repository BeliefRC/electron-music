const {app, ipcMain} = require('electron')
const AppWindow = require('./utils/AppWindow')

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')

  ipcMain.on('add-music-window', (event, arg) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, './renderer/add.html')
  })

})
