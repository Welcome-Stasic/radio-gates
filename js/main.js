function setStage(n) {
  game.stage = n
  scanBtn.disabled = n != 2
  drawLevers()
  setLine('front', lines.front[n])
  setLine('back', lines.back[n])
}

document.getElementById('again').onclick = () => location.reload()

drawLevers()
current.front = lines.front[0]
current.back = lines.back[0]
setTimeout(() => talk(current.front), 900)

function fitStage() {
  let w = innerWidth, h = innerHeight
  let fit = w / h < 4 / 3
  let s = fit ? Math.min(w / 1672, h / 941) : Math.max(w / 1672, h / 941)
  document.body.style.setProperty('--s', s)
  document.body.classList.toggle('fit', fit)
}
addEventListener('resize', fitStage)
fitStage()
