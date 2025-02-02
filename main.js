
/**
 * snake <https://yousero.github.io/snake/>
 * @author yousero yousero.art@gmail.com
 * @version 0.0.5
 */

const canvas = document.getElementById('canvas')
const source = document.createElement('canvas')

canvas.height = source.height = 480
canvas.width = source.width = 480

let border = 2
let size = 12
let margin = 2

const ctx = source.getContext('2d')

const gridSize = 20;
const tileCount = canvas.width / gridSize

let snake = [{ x: 10, y: 10 }]
let direction = { x: 0, y: 0 }

let food = { x: 5, y: 5 }

let score = 0
let gameOver = true

const background = {
  color: '#030403',
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

const gridBorder = {
  color: '#04f404',
  draw() {
    ctx.strokeStyle = this.color
    ctx.strokeRect(0 + 0.5, 0 + 0.5, canvas.width - 1, canvas.height - 1)
  }
}

const square = {
  color: '#04f404',
  x: 20,
  y: 20,
  width: size,
  height: size,
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const update = () => {
  const destCtx = canvas.getContext('2d')
  destCtx.drawImage(source, 0, 0)
}

const draw = () => {
  background.draw()
  gridBorder.draw()

  if (gameOver) {    
    return
  }

  for (let a = 0; a < 34; ++a) {
    for (let b = 0; b < 34; ++b) {
      // square.x = 
    }
  }
}

const run = () => {
  draw()
  update()

  requestAnimationFrame(run)
}

draw()
update()

document.addEventListener('click', (event) => {
  if (!gameOver) {
    gameOver = false
    run()
  }
})

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 }
      break
  }
})
