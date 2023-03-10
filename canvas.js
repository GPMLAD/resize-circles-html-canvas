const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

const colorArray = [
  "#608741",
  "#874833",
  "#4E5887",
  "#3B2219",
  "#273B16"
]

const mouse = {
  x: undefined,
  y: undefined
}

const maxRadius = 40
const minRadius = 2
const increaseRate = 1.5
const decreaseRate = -1.5
const maxCircles = 200

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('touchmove', (event)=> {
  mouse.x = event.touches[0].clientX
  mouse.y = event.touches[0].clientY
})

window.addEventListener('touchend', (event)=> {
  mouse.x = undefined
  mouse.y = undefined
})

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})


function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.originalRadius = radius
  this.color =  colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
  
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
  
    this.x += this.dx
    this.y += this.dy

    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += increaseRate
      }
    } else if(this.radius > this.originalRadius){
      this.radius += decreaseRate
    }

    this.draw()
  }
}

let circleArray = []



function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, innerWidth, innerHeight)

  for(let i = 0; i < circleArray.length; i++){
    circleArray[i].update()
  }
}

function init(){
  circleArray = []
  for(let i = 0; i < maxCircles ;i++){
    let radius = Math.random() * 15 + 2
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5) * 1
    let dy = (Math.random() - 0.5) * 1
  
    
    circleArray.push(new Circle(x,y,dx,dy,radius))
  }
}

init()
animate()