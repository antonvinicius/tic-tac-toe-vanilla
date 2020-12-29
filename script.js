function storeMenuChoice(e) {
    localStorage.setItem('menuOption', e.id)
    document.getElementById('menu').style.display = 'none'
    document.getElementById('ch').style.display = 'block'
    if(e.id == 'local'){
        document.getElementById('chooseTxt').innerText = 'Escolha o ícone do Jogador 1'
        setPlayersNames()
        document.getElementById('score').style.display = 'flex'
    }
}

function setPlayersNames() {
    document.getElementById('playersName').style.display = 'flex'
}

//Choose
let player1Score = 0
let player2Score = 0
let player1
let player2
let turn = player1
let menuOption
let playerChoose
let cpuChoose
function choose(e) {
    let p1 = document.getElementById('p1')
    let p2 = document.getElementById('p2')
    player1 = p1.value == '' ? 'Jogador 1' : p1.value
    player2 = p2.value == '' ? 'Jogador 2' : p2.value
    playerChoose = e.classList[1]
    cpuChoose = playerChoose == 'cross' ? 'circle' : 'cross'
    menuOption = localStorage.getItem('menuOption')
    document.getElementById('playersName').style.display = 'none'
    document.getElementById('ch').style.display = 'none'
    document.getElementById('grid').style.display = 'grid'
    if(localStorage.getItem('menuOption') != 'cpu')
        turnTxt.innerText = `Vez: ${player1}`
    turn = player1
}
let positionOccupied = []
let items = document.getElementsByClassName('tic-tac-toe-item')
let stop = false
let won = false
let turnTxt = document.getElementById('turn')
items = [...items]
items.forEach(item => {
    item.onclick = () => {
        if(!won && !(item.classList.contains(cpuChoose)) && !(item.classList.contains(playerChoose))){
            let turn_txt = turn == player1 ? player2 : player1
            if(localStorage.getItem('menuOption') != 'cpu')
                turnTxt.innerText = `Vez: ${turn_txt}`
        }
        //Game Logic
        let clickedPosition = item.id
        if (!item.classList.contains(playerChoose) && !item.classList.contains(cpuChoose) && !stop) {
            if (menuOption == 'local') {
                if (turn == player1) {
                    item.classList.add(playerChoose)
                    turn = player2
                } else {
                    item.classList.add(cpuChoose)
                    turn = player1
                }
                positionOccupied.push(parseInt(clickedPosition))
                if (isFull()) {
                    document.getElementById('turn').innerText = ''
                    document.getElementById('grid').style.opacity = '0.4'
                    document.getElementById('replay').style.display = 'block'
                    let btn = document.getElementById('btn')
                    btn.onclick = clear
                }
            }
            //CPU
            if (menuOption == 'cpu') {
                item.classList.add(playerChoose)
                positionOccupied.push(parseInt(clickedPosition))
                let randomInt = 0
                let cpuTarget = document.getElementById(clickedPosition)
                if (!isFull()) {
                    do {
                        randomInt = Math.floor(Math.random() * (9 - 1) + 1)
                        cpuTarget = document.getElementById(randomInt)
                        console.log(randomInt)
                    } while (positionOccupied.includes(randomInt))
                    positionOccupied.push(randomInt)
                    console.log(positionOccupied)
                    cpuTarget.classList.add(cpuChoose)
                } else {
                    document.getElementById('turn').innerText = ''
                    document.getElementById('grid').style.opacity = '0.4'
                    document.getElementById('replay').style.display = 'block'
                    let btn = document.getElementById('btn')
                    btn.onclick = clear
                }
            }
        }
        stop = isWin()
        if ((stop == player1 || stop == player2) && !won) {
            won = true
            if (stop == player1) {
                document.getElementById('turn').innerText = `${player1} Venceu!`
                player1Score++
                document.getElementById('scr1').innerText = player1Score
            }
            else {
                document.getElementById('turn').innerText = `${player2} Venceu!`
                player2Score++
                document.getElementById('scr2').innerText = player2Score
            }
            document.getElementById('grid').style.opacity = '50%'
            document.getElementById('grid').style.animationName = 'unset'
            document.getElementById('replay').style.display = 'block'
            let btn = document.getElementById('btn')
            btn.onclick = clear
        }
    }
})

const isFull = () => positionOccupied.length == 9
const clear = () => {
    items.forEach(item => {
        document.getElementById('grid').style.opacity = '1'
        item.classList.remove('cross')
        item.classList.remove('circle')
        item.classList.remove('winner')
        item.classList.remove('enemy')
        positionOccupied = []
        stop = false
        won = false
        playerChoose = ''
        document.getElementById('replay').style.display = 'none'
        document.getElementById('grid').style.display = 'none'
        document.getElementById('grid').style.animationName = 'fadeIn'
        document.getElementById('ch').style.display = 'block'
        document.getElementById('turn').innerText = ''
    })
}
const isWin = () => {
    //Horizontal
    for (let i = 0; i < items.length; i += 3) {
        if (items[i].classList.contains(playerChoose) && items[i + 1].classList.contains(playerChoose) && items[i + 2].classList.contains(playerChoose)) {
            items[i].classList.add('winner')
            items[i + 1].classList.add('winner')
            items[i + 2].classList.add('winner')
            return player1
        }
        else if (items[i].classList.contains(cpuChoose) && items[i + 1].classList.contains(cpuChoose) && items[i + 2].classList.contains(cpuChoose)) {
            items[i].classList.add('enemy')
            items[i + 1].classList.add('enemy')
            items[i + 2].classList.add('enemy')
            return player2
        }
    }
    //Vertical
    for (let i = 0; i < 3; i++) {
        if (items[i].classList.contains(playerChoose) && items[i + 3].classList.contains(playerChoose) && items[i + 6].classList.contains(playerChoose)) {
            items[i].classList.add('winner')
            items[i + 3].classList.add('winner')
            items[i + 6].classList.add('winner')
            return player1
        }
        else if (items[i].classList.contains(cpuChoose) && items[i + 3].classList.contains(cpuChoose) && items[i + 6].classList.contains(cpuChoose)) {
            items[i].classList.add('enemy')
            items[i + 3].classList.add('enemy')
            items[i + 6].classList.add('enemy')
            return player2
        }
    }

    //Diagonal
    for (let i = 0; i < 3; i += 2) {
        if (items[i].classList.contains(playerChoose) && items[4].classList.contains(playerChoose) && items[8 - i].classList.contains(playerChoose)) {
            items[i].classList.add('winner')
            items[4].classList.add('winner')
            items[8 - i].classList.add('winner')
            return player1
        }
        else if (items[i].classList.contains(cpuChoose) && items[4].classList.contains(cpuChoose) && items[8 - i].classList.contains(cpuChoose)) {
            items[i].classList.add('enemy')
            items[4].classList.add('enemy')
            items[8 - i].classList.add('enemy')
            return player2
        }
    }
    return false
}