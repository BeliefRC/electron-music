const {ipcRenderer} =require('electron')
const {$} =require('./helper')

window.addEventListener('DOMContentLoaded',()=>{
  const selectMusic=$('select-music')
  selectMusic.addEventListener('click',()=>{
    ipcRenderer.send('open-music-file')
  })
})
