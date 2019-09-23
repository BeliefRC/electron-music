const path = require('path')
const {ipcRenderer} = require('electron')
const {$} = require('./helper')

let musicFilesPath = []

window.addEventListener('DOMContentLoaded', () => {
  const selectMusic = $('select-music')
  selectMusic.addEventListener('click', () => {
    ipcRenderer.send('open-music-file')
  })
  const addMusic = $('add-music')
  addMusic.addEventListener('click', () => {
    if (Array.isArray(musicFilesPath) && musicFilesPath.length) {
      ipcRenderer.send('add-tracks', musicFilesPath)
    }else {
    }
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
      musicFilesPath = path
    }
  })
})

