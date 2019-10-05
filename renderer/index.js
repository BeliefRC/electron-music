const {ipcRenderer} = require('electron')
const {$, convertDuration} = require('./helper')
let allTracks = []
let musicAudio = new Audio()
let currentTrack
window.addEventListener('DOMContentLoaded', () => {
  const renderPlayerHTML = (name, duration) => {
    const player = $('player-status')
    player.innerHTML = `<div class="col font-weight-bold">
                  正在播放：${name}
                </div>
                <div class="col">
                  <span id="current-seeker">00:00</span> / ${convertDuration(duration)}
                </div>`
  }

  const updateProgressHTML = (currentTime, duration) => {
    // 计算 progress 是当前要解决的问题
    const progress = Math.floor(currentTime / duration * 100)
    const bar = $('player-progress')
    bar.innerHTML = progress + '%'
    bar.style.width = progress + '%'
    const seeker = $('current-seeker')
    seeker.innerHTML = convertDuration(currentTime)
  }
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

  $('tracksList').addEventListener('click', (event) => {
    event.preventDefault()
    const {dataset, classList} = event.target
    const id = dataset && dataset.id
    if (id && classList.contains('icon-bofang')) {
      // 开始播放音乐
      if (currentTrack && currentTrack.id === id) {
        // 继续播放音乐
        musicAudio.play()
      } else {
        // 播放新的歌曲，注意还原之前的图标
        currentTrack = allTracks.find(track => track.id === id)
        musicAudio.src = currentTrack.path
        musicAudio.play()
        const resetIconEle = document.querySelector('.icon-zanting')
        if (resetIconEle) {
          resetIconEle.classList.replace('icon-zanting', 'icon-bofang')
        }
      }
      classList.replace('icon-bofang', 'icon-zanting')
    } else if (id && classList.contains('icon-zanting')) {
      // 处理暂停逻辑
      musicAudio.pause()
      classList.replace('icon-zanting', 'icon-bofang')
    } else if (id && classList.contains('icon-shanchu')) {
      // 删除这条音乐
      ipcRenderer.send('delete-track', id)
    }
  })

  musicAudio.addEventListener('loadedmetadata', () => {
    //渲染播放器状态
    renderPlayerHTML(currentTrack.fileName, musicAudio.duration)
  })

  musicAudio.addEventListener('timeupdate', () => {
    //更新播放器状态
    updateProgressHTML(musicAudio.currentTime, musicAudio.duration)
  })
})
