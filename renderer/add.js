const path = require('path')
const {ipcRenderer} = require('electron')
const {$} = require('./helper')

window.addEventListener('DOMContentLoaded', () => {
  const selectMusic = $('select-music')
  selectMusic.addEventListener('click', () => {
    ipcRenderer.send('open-music-file')
  })
  const renderListHTML = paths => {
    const musicList = $('musicList')
    const musicItemsHTML = paths.reduce((html, music) => {
      html += `<li class="list-group-item">${path.basename(music)}</li>`
      return html
    }, '')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
  }
  ipcRenderer.on('selected-file', (event, path) => {
    if (Array.isArray(path)) {
      renderListHTML(path)
    }
  })
})

