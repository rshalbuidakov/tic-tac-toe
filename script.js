//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXButton = selectBox.querySelector(".playerX"),
selectOButton = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button")

window.onload = ()=>{//once window loaded
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)")
    }

    selectXButton.onclick = ()=>{
        selectBox.classList.add("hide")
        playBoard.classList.add("show")
    }
    selectOButton.onclick = ()=>{
        selectBox.classList.add("hide")
        playBoard.classList.add("show")
        players.setAttribute("class", "players active player")
    }
}

const XIcon = "fas fa-times"
const OIcon = "far fa-circle"
var playerSign = "X"
var runBot = true

// user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<i class = "${OIcon}"><i>`
        players.classList.add("active")
        playerSign = "O"
        element.setAttribute("id", playerSign)
    }else{
        element.innerHTML = `<i class = "${XIcon}"><i>`
        players.classList.add("active")
        element.setAttribute("id", playerSign)
    }
    selectWinner()
    playBoard.style.pointerEvents = "none"
    element.style.pointerEvents = "none"
    var randomDelayTime = ((Math.random()*1000)+200).toFixed()
    setTimeout(()=>{
        bot()
    }, randomDelayTime)
}
// bot click function
function bot(){
    if(runBot){
        var array = [] //empty array... we'll store unselected box indexes in this array
    playerSign = "O"
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){
            array.push(i)
        }
    }
    var randomBox = array[Math.floor( Math.random() * array.length)]

    if(array.length>0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class = "${XIcon}"><i>`
            players.classList.remove("active")
            playerSign = "X"
            allBox[randomBox].setAttribute("id", playerSign)
        }else{
            allBox[randomBox].innerHTML = `<i class = "${OIcon}"><i>`
            players.classList.remove("active")
            allBox[randomBox].setAttribute("id", playerSign)
        }
        selectWinner()
    }
    allBox[randomBox].style.pointerEvents = "none"
    playBoard.style.pointerEvents = "auto"
    playerSign = "X"
    }
}

// selecting the winner
function getId(idname){
    return document.querySelector(".box"+idname).id
}

function checkThreeIds(val1, val2, val3, sign){
    if(getId(val1)==sign&&getId(val2)==sign&&getId(val3)==sign){
        return true
    }
}
function selectWinner(){
    if(checkThreeIds(1, 2, 3, playerSign)||checkThreeIds(4, 5, 6, playerSign)||checkThreeIds(7, 8, 9, playerSign)||
    checkThreeIds(1, 4, 7, playerSign)||checkThreeIds(2, 5, 8, playerSign)||checkThreeIds(3, 6, 9, playerSign)||
    checkThreeIds(1, 5, 9, playerSign)||checkThreeIds(3, 5, 7, playerSign)){
        runBot = false
        setTimeout(()=>{
            playBoard.classList.remove("show")
            resultBox.classList.add("show")
        }, 700)
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
    }else{
        if(getId(1)!=""&&getId(2)!=""&&getId(3)!=""&&getId(4)!=""&&getId(5)!=""&&getId(6)!=""&&getId(7)!=""&&getId(8)!=""&&getId(9)!=""){
            runBot = false
            setTimeout(()=>{
                playBoard.classList.remove("show")
                resultBox.classList.add("show")
            }, 700)
            wonText.innerHTML = `Match has been drawn!`
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload()
}