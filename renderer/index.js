const {ipcRenderer} =require('electron')

window.addEventListener('DOMContentLoaded',()=>{
  const addMusicBtn=document.getElementById('add-music-button')
  addMusicBtn.addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
  })
})
