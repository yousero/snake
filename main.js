
/**
 * snake <https://yousero.github.io/snake/>
 * @author yousero yousero.art@gmail.com
 * @version 0.0.7
 */

const canvas = document.getElementById('canvas')
const source = document.createElement('canvas')

canvas.height = source.height = 480
canvas.width = source.width = 480

const ctx = source.getContext('2d')

const gridSize = 20
const tileCount = canvas.width / gridSize

let border = 2
let size = 12
let margin = 2

let snake = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
]
let direction = { x: 0, y: -1 }
let foodPos = { x: 15, y: 15 }
let gameStart = true
let gameOver = true
let gameInterval = null

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

const snakeBody = {
  color: '#04f404',
  width: size,
  height: size,
  draw(x, y) {
    ctx.fillStyle = this.color
    ctx.fillRect(x + border + margin,
                 y + border + margin,
                 this.width,
                 this.height)
  }
}

const snakeHead = {
  color: '#04f404',
  width: size + margin,
  height: size + margin,
  draw(x, y) {
    ctx.fillStyle = this.color
    ctx.fillRect(x + border - 1 + margin,
                 y + border - 1 + margin,
                 this.width,
                 this.height)
  }
}

const food = {
  color: '#f40404',
  width: size,
  height: size,
  draw(x, y) {
    ctx.fillStyle = this.color
    ctx.fillRect(x + border + margin,
                 y + border + margin,
                 this.width,
                 this.height)
  }
}

function generateFood() {
  const isOnSnake = (pos) => snake.some(segment => 
    segment.x === pos.x && segment.y === pos.y
  )
  
  let newPos
  do {
    newPos = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    }
  } while (isOnSnake(newPos))
  
  foodPos = newPos
}

function moveSnake() {
  if (gameOver) return

  const head = { 
    x: snake[0].x + direction.x, 
    y: snake[0].y + direction.y 
  }

  // Wall collision
  if (head.x < 0 || head.x >= tileCount || 
      head.y < 0 || head.y >= tileCount) {
    gameOver = true
    return
  }
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true
      return
    }
  }

  snake.unshift(head)

  // Food collision
  if (head.x === foodPos.x && head.y === foodPos.y) {
    generateFood()
  } else {
    snake.pop()
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
    ctx.fillStyle = '#fff'
    ctx.font = '48px sans-serif'
    ctx.textAlign = 'center'
    if (!gameStart) {
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2)      
      ctx.font = '24px sans-serif'
      ctx.fillText('CLICK TO START', canvas.width/2, canvas.height/2 + 40)
    } else {
      ctx.font = '24px sans-serif'
      ctx.fillText('CLICK TO START', canvas.width/2, canvas.height/2)
    }
    return
  }

  // Draw snake
  snake.forEach((segment, index) => {
    const x = segment.x * gridSize
    const y = segment.y * gridSize
    if (index === 0) {
      snakeHead.draw(x, y)
    } else {
      snakeBody.draw(x, y)
    }
  })

  // Draw food
  food.draw(foodPos.x * gridSize, foodPos.y * gridSize)
}

const run = () => {
  if (gameOver) {
    if (gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
    }
    return
  }
  
  moveSnake()
  draw()
  update()
}

document.addEventListener('click', () => {
  gameStart = false
  if (gameOver) {
    gameOver = false
    snake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
    ]
    direction = { x: 0, y: -1 }
    generateFood()
    gameInterval = setInterval(run, 200)
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

draw()
update()
