const stones = document.querySelectorAll('.stone')
const palette = document.getElementById('palette')
const scanBtn = document.getElementById('scanBtn')

let selected = null
let slots = [null, null, null]

allGlyphs.slice().sort(() => Math.random() - 0.5).forEach(g => {
  let b = document.createElement('button')
  b.className = 'chip'
  b.dataset.g = g
  b.innerHTML = `<img src="img/glyphs/${g}.svg" alt="">`
  b.onclick = () => pick(g)
  palette.appendChild(b)
})

function chip(g) {
  return document.querySelector(`.chip[data-g="${g}"]`)
}

function pick(g) {
  if (game.stage != 0) return
  selected = selected == g ? null : g
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('selected', c.dataset.g == selected))
  stones.forEach((s, i) => s.classList.toggle('target', !!selected && !slots[i]))
}

stones.forEach((st, i) => {
  st.querySelector('.sparks').textContent = sparks[i] ? '✦'.repeat(sparks[i]) : '—'
  st.onclick = () => {
    if (game.stage != 0) return
    if (slots[i]) {
      chip(slots[i]).classList.remove('used')
      slots[i] = null
      drawStones()
      return
    }
    if (!selected) return
    slots[i] = selected
    chip(selected).classList.add('used')
    pick(selected)
    drawStones()
    if (!slots.includes(null)) setTimeout(checkStones, 400)
  }
})

function drawStones() {
  stones.forEach((st, i) => {
    if (slots[i]) st.querySelector('.glyph').src = `img/glyphs/${slots[i]}.svg`
    st.classList.toggle('filled', !!slots[i])
  })
}

function checkStones() {
  if (slots.join() == answer.join()) {
    stones.forEach(s => s.classList.add('locked', 'glow'))
    document.body.classList.add('sparks-on')
    palette.innerHTML = ''
    document.getElementById('noteLever').classList.add('show')
    setStage(1)
    return
  }
  stones.forEach(s => s.classList.add('error'))
  talk(failLines.front)
  setLine('back', failLines.back)
  document.getElementById('noteMirror').classList.add('show')
  setTimeout(() => {
    stones.forEach(s => s.classList.remove('error'))
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('used'))
    slots = [null, null, null]
    drawStones()
  }, 600)
}

scanBtn.onclick = () => {
  if (game.stage != 2) return
  game.stage = 3
  scanBtn.disabled = true
  document.body.classList.add('decoded')
  stones.forEach((st, i) => {
    setTimeout(() => {
      st.classList.remove('glow')
      st.classList.add('scanning')
    }, i * 1700)
    setTimeout(() => {
      st.classList.remove('scanning')
      st.classList.add('scanned', 'revealed')
    }, i * 1700 + 1150)
  })
  setTimeout(() => {
    setLine('front', lines.front[3])
    current.back = lines.back[3]
    document.body.classList.add('done')
    document.getElementById('final').classList.add('show')
  }, 3 * 1700 + 300)
}
