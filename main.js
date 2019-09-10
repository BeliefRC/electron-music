const {app, ipcMain, dialog} = require('electron')
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
  ipcMain.on('open-music-file', (event, arg) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{name: 'Music', extensions: ['mp3']}]
    }, files => {
      if (files)
        event.sender.send('selected-file',files)
    })
  })

})
