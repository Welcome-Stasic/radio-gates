const radioEl = document.getElementById('radio')
const subs = document.getElementById('subs')
const subsName = document.getElementById('subsName')
const subsText = document.getElementById('subsText')

let typing, hideTimer, ctx
let current = { front: lines.front[0], back: lines.back[0] }

function crackle(len = 0.35) {
  try {
    ctx = ctx || new AudioContext()
    let n = ctx.sampleRate * len
    let buf = ctx.createBuffer(1, n, ctx.sampleRate)
    let d = buf.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n)
    let src = ctx.createBufferSource()
    src.buffer = buf
    let f = ctx.createBiquadFilter()
    f.type = 'bandpass'
    f.frequency.value = 1700
    let g = ctx.createGain()
    g.gain.value = 0.2
    src.connect(f).connect(g).connect(ctx.destination)
    src.start()
  } catch (e) {}
}

function beep() {
  try {
    let o = ctx.createOscillator()
    let g = ctx.createGain()
    o.frequency.value = 1150
    g.gain.value = 0.05
    o.connect(g).connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + 0.09)
  } catch (e) {}
}

function talk([name, text]) {
  clearInterval(typing)
  clearTimeout(hideTimer)
  crackle(0.2)
  radioEl.classList.add('talking')
  subs.classList.add('show')
  subsName.textContent = name
  subsText.textContent = ''
  let i = 0
  typing = setInterval(() => {
    subsText.textContent = text.slice(0, ++i)
    if (i >= text.length) {
      clearInterval(typing)
      beep()
      setTimeout(() => radioEl.classList.remove('talking'), 300)
      hideTimer = setTimeout(() => subs.classList.remove('show'), 5000)
    }
  }, 28)
}

function setLine(side, line) {
  current[side] = line
  if (side == game.side) talk(line)
  else radioEl.classList.add('missed')
}

document.getElementById('walkie').onclick = () => talk(current[game.side])
