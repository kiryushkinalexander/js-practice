const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['#dc143c', '#ff69b4', '#ff4500', '#ffff00', '#9370db', '#483d8b', '#a9a9a9', '#00ced1', '#ff6347' , '#fafad2']
let time = 0
let score = 0

const setTime = (value) => {
  timeEl.innerHTML = `00:${value}`
}

const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index] 
}

const startGame = () => {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

const finishGame = () => {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет: <span class = "primary">${score}</span></h1>`
}

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const createRandomCircle = (element) => {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const color = getRandomColor(circle)
  console.log(circle)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = color
  board.append(circle)

}
 
const decreaseTime = () => {
  if (time === 0 ) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
  }
  setTime(current)
  }
}

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame();
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})