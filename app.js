// tic tac toe
let turn;                                              // turn = false by default
const X_Class = 'x';                                   // 'x' = Skull = false
const O_Class = 'o';                                   // 'o' = Bat   = true
const box = document.querySelectorAll('.box')
const play = document.querySelector('.play')

const winner = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
              ]

// Start game remove all functionality and atributes from board
startGame()

function startGame(){
  turn = false

      for(let el of box){
            el.classList.remove(X_Class)
            el.classList.remove(O_Class) 
            el.removeEventListener('click', clickHandler, {once: true})
            el.addEventListener('click', clickHandler, {once: true})
         }
            play.innerHTML = '<img src="goth/skull2.png" class="bat">'
            document.querySelector('.overLay').style.display = 'none'
            document.querySelector('.win').innerText = ""
            document.getElementById('sound').load()
}


function clickHandler(e){
  const cell = e.target

     let currentClass = turn ? O_Class : X_Class

       setMark(cell, currentClass)
       changeMark()
       currentPlayer(cell)
          if(checkWin(currentClass)){
              endGame(true)
         }else if(isTie()){
              endGame(false)
         }
}

// Show overlay and if it is a draw or there is a winner
function endGame(win) {
    if(win){
      document.querySelector('.overLay').style.display = 'flex'
      document.querySelector('.win').innerText = turn ? 'Skull Wins!' : 'Bat Wins!'
      playAudio()
    }else{
      document.querySelector('.overLay').style.display = 'flex'
      document.querySelector('.win').innerText = 'It\s a Draw!'
      playAudio2()
    }
 
}

// Draw, No winner, after every box is selected
function isTie(){
   return [...box].every( box => {
     return box.classList.contains(X_Class) || box.classList.contains(O_Class)
    })
}

// Howling wolf
function playAudio() {
  document.getElementById('sound').play()
 }

// Scary sound
function playAudio2() {
  document.getElementById('sound2').play()
 }

// Mute audio if wanted
document.querySelector('.pic').addEventListener('click', muteAudio)
function muteAudio(e){
       const icon = e.target
       const pic = document.querySelector('.pic')
         if(icon){
            pic.classList.toggle('pic2')
         if(pic.classList.contains('pic2')) {
              document.getElementById('sound').muted = true
              document.getElementById('sound2').muted = true
        }else{
              document.getElementById('sound').muted = false
              document.getElementById('sound2').muted = false
             }
      }
}

// Place mark on board
function setMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// Change from skull to bat on every click
function changeMark() {
  if (turn) {                      
       turn = false
  } else {
       turn = true
  }
  // Short: turn = !turn   
}

// Check for winning combinations
function checkWin(currentClass) {
  //console.log(currentClass)                                          // 'x' or 'o'
  return winner.some(combination => {                                  // return true if one element meets the condition
    console.log(combination)                                           // all the sub arrays, [0, 1, 2] etc.
    return combination.every(index  => {                               // checks every element in the array, makes sure every element has the same class, 
        console.log(index)                                             // index cause cells start with 0 in the array
        return box[index].classList.contains(currentClass)             // returns boolean value, true or false
    })                                                                 
})
}

// Clear the board
const button = document.querySelector('.sword')
button.addEventListener('click', clear)

function clear(e) {
    box.forEach( el => {
       el.classList.remove(X_Class)
       el.classList.remove(O_Class)
       el.removeEventListener('click', clickHandler)
      })
     
      startGame()
}

// Switch between currentPlayer icons skull and Bat 
function currentPlayer(cell) {
    cell.classList.contains(O_Class) ? play.innerHTML = '<img src="goth/skull2.png" class="bat">' :  play.innerHTML = '<img src="goth/bat2.png" class="bat">'
    }

// Start new game, after win or draw
document.querySelector('.newGame').addEventListener( 'click', startGame);