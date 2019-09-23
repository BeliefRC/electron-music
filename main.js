const {app, ipcMain, dialog} = require('electron')
const AppWindow = require('./utils/AppWindow')
const DataStore = require('./renderer/MusicDataStore')
const myStore = new DataStore({
  name: 'electron-music'
})
app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')
  mainWindow.webContents.on('did-finish-load',()=>{
    const updatedTracks = myStore.getTracks()
    mainWindow.send('getTracks', updatedTracks)
  })
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
        event.sender.send('selected-file', files)
    })
  })
  ipcMain.on('add-tracks', (event, tracks) => {
    console.log('on add-tracks')
    const updatedTracks = myStore.addTracks(tracks).getTracks()
    mainWindow.send('getTracks', updatedTracks)
  })
})
