
/**
 * snake <https://yousero.github.io/snake/>
 * @author yousero yousero.art@gmail.com
 * @version 0.0.2
 */

const canvas = document.getElementById('canvas')
const source = document.createElement('canvas')

canvas.height = source.height = 480
canvas.width = source.width = 480

const ctx = source.getContext('2d')

const background = {
  color: '#030403',
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

const update = () => {
  const destCtx = canvas.getContext('2d')
  destCtx.drawImage(source, 0, 0)
}

const draw = () => {
  background.draw()
}

const run = () => {
  draw()
  update()

  requestAnimationFrame(run)
}

draw()
update()
