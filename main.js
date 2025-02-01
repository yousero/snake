
/**
 * snake <https://yousero.github.io/snake/>
 * @author yousero yousero.art@gmail.com
 * @version 0.0.4
 */

const canvas = document.getElementById('canvas')
const source = document.createElement('canvas')

canvas.height = source.height = 480
canvas.width = source.width = 480

let border = 2
let size = 12
let margin = 2

const ctx = source.getContext('2d')

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

const update = () => {
  const destCtx = canvas.getContext('2d')
  destCtx.drawImage(source, 0, 0)
}

const draw = () => {
  background.draw()
  gridBorder.draw()
}

const run = () => {
  draw()
  update()

  requestAnimationFrame(run)
}

draw()
update()
