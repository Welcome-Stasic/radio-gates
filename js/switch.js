const edge = document.getElementById('edge')
let busy = false
let armed = true

function jump() {
  if (busy || !zoom.hidden || game.stage == 3) return
  busy = true
  crackle(0.45)
  document.body.classList.add('jumping')

  setTimeout(() => {
    game.side = game.side == 'front' ? 'back' : 'front'
    let front = game.side == 'front'
    document.body.classList.toggle('on-front', front)
    document.body.classList.toggle('on-back', !front)
    document.getElementById('whoPlace').textContent = front ? 'Снаружи' : 'Изнутри'
    document.getElementById('whoName').textContent = front ? 'Багги' : 'Хранитель'
    document.getElementById('edgeLabel').textContent = front ? 'Изнутри' : 'Снаружи'
    if (radioEl.classList.contains('missed')) {
      radioEl.classList.remove('missed')
      setTimeout(() => talk(current[game.side]), 400)
    }
  }, 230)

  setTimeout(() => {
    document.body.classList.remove('jumping')
    busy = false
  }, 560)
}

edge.addEventListener('pointerenter', e => {
  if (e.pointerType != 'mouse' || !armed) return
  armed = false
  jump()
})
edge.addEventListener('pointerleave', () => armed = true)
edge.addEventListener('click', () => { if (armed) jump() })

document.addEventListener('keydown', e => {
  if (e.code == 'Space') {
    e.preventDefault()
    jump()
  }
  if (e.key == 'Escape') zoom.hidden = true
})
