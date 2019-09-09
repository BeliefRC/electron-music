const {ipcRenderer} =require('electron')
const {$} =require('./helper')

window.addEventListener('DOMContentLoaded',()=>{
  const addMusicBtn=$('add-music-button')
  addMusicBtn.addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
  })
})
