const {ipcRenderer} = require('electron')
const {$} = require('./helper')
let allTracks = []
window.addEventListener('DOMContentLoaded', () => {
  const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const tracksListHTML = tracks.reduce((html, track) => {
      html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center">
      <div class="col-10">
        <i class="iconfont icon-music mr-2 text-secondary"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="iconfont icon-bofang mr-3" data-id="${track.id}"></i>
        <i class="iconfont icon-shanchu" data-id="${track.id}"></i>
      </div>
    </li>`
      return html
    }, '')
    const emptyTrackHTML = '<div class="alert alert-primary">还没有添加任何音乐</div>'
    tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
  }
  const addMusicBtn = $('add-music-button')
  addMusicBtn.addEventListener('click', () => {
    ipcRenderer.send('add-music-window')
  })

  ipcRenderer.on('getTracks', (event, tracks) => {
    allTracks = tracks
    renderListHTML(tracks)
  })
})
