
/**
 * snake <https://yousero.github.io/snake/>
 * @author yousero yousero.art@gmail.com
 * @version 0.0.1
 */

const canvas = document.getElementById('canvas')

canvas.height = 480
canvas.width = 480

const ctx = canvas.getContext('2d')

const background = {
  color: '#f1f1f1',
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

background.draw()
