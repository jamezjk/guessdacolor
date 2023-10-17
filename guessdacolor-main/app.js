// INITIALISATION

const containerEl = document.querySelector(".color-box-container")
const colorBoxEl = document.querySelectorAll(".color-box")
const qBoxEl = document.querySelector("#q-box")
const winBoxEl = document.getElementById("win-box")
const modeBoxEl = document.getElementById("mode-box")
const livesEl = document.getElementById("lives")
const pointsEl = document.getElementById("points")

let i
let difficulty = 6 // 3 or 6
let colorsArray = []
let points = 0
let lives = 3

// EXECUTABLES

if (localStorage.getItem("highscore") == null) {
    localStorage.setItem("highscore", 0);
}
let highScore = localStorage.getItem("highscore")
document.getElementById('hi-score').innerHTML = `High Score : ${highScore}`


easyMode()

function easyMode() {
    modeBoxEl.innerHTML = "<i>Mode : Easy</i>"
    containerEl.innerHTML = ""
    winBoxEl.innerHTML = "Guess the right color"
    colorsArray = []
    difficulty = 3
    createBoxes()
    correctColor = colorsArray[randomArrayIndex()]
    qBoxEl.innerHTML = `${correctColor}`
    modeEasy = true
    highscore()
}

function hardMode() {
    modeBoxEl.innerHTML = "<i>Mode : Hard</i>"
    containerEl.innerHTML = ""
    winBoxEl.innerHTML = "Guess the right color"
    colorsArray = []
    difficulty = 6
    createBoxes()
    correctColor = colorsArray[randomArrayIndex()]
    qBoxEl.innerHTML = `${correctColor}`
    modeEasy = false
}


// THE FUNCTIONLAND

function validateColor(id) {
    const clickedElColor = document.getElementById(id).style.backgroundColor
    if (clickedElColor == correctColor) {
        winBoxEl.innerHTML = "You Got it! <br><p>Click a mode to play again</p>"
        console.log("CORRECT")
        points += 1
        pointsEl.innerHTML = `Score : ${points}`
        console.log(points, lives)
        if (modeEasy) {
            easyMode()
        } else {
            hardMode()
        }
    } else {
        winBoxEl.innerHTML = "Nope.. Go again"
        console.log("NOT CORRECT")
        lives -= 1
        livesEl.innerHTML = "❤️".repeat(lives)
        if (lives == 0) {
            alert("You ran out of Lives")
            location.reload();
        }
        console.log(points, lives)
    }
}

function createBoxes() {
    for (i = 0; i < difficulty; i++) {
        let color = generateRandom()
        colorsArray.push(color)
        // CREATING COLOR BOXES
        const e = document.createElement("div");
        e.setAttribute("id", i)
        e.setAttribute("class", "color-box")
        e.setAttribute("onclick", "validateColor(id)")
        e.style.backgroundColor = color
        containerEl.appendChild(e)
    }
}

function generateRandom() {
    randomDigit1 = Math.floor((Math.random() * 255) + 1);
    randomDigit2 = Math.floor((Math.random() * 255) + 1);
    randomDigit3 = Math.floor((Math.random() * 255) + 1);
    let someColor = `rgb(${randomDigit1}, ${randomDigit2}, ${randomDigit3})`
    return someColor
}

function randomArrayIndex() {
    return Math.floor((Math.random() * difficulty) + 0);
}

function highscore() {
    if (points > highScore) {
        highScore = points
        document.getElementById('hi-score').innerHTML = `High Score : ${highScore}`
        localStorage.setItem("highscore", highScore);
        localStorage.getItem("highscore");
    }
}


/*
createBoxes()
correctColor = colorsArray[randomArrayIndex()]
qBoxEl.innerHTML = correctColor
*/