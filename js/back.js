const leverBtns = document.querySelectorAll('.lever')
let levers = [0, 0, 0]

leverBtns.forEach((btn, i) => {
  btn.onclick = () => {
    if (game.stage != 1) return
    levers[i] = (levers[i] + 1) % 4
    drawLevers()
    if (levers.join() == leversAnswer.join()) {
      setTimeout(() => {
        document.body.classList.add('unlocked')
        setStage(2)
      }, 450)
    }
  }
})

function drawLevers() {
  leverBtns.forEach((btn, i) => {
    btn.style.setProperty('--angle', angles[levers[i]] + 'deg')
    btn.disabled = game.stage != 1
  })
}

const zoom = document.getElementById('zoom')
document.getElementById('tablet').onclick = () => {
  document.getElementById('zoomCard').innerHTML = document.getElementById('tablet').innerHTML
  zoom.hidden = false
}
zoom.onclick = () => zoom.hidden = true
