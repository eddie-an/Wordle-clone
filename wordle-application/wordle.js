function changeThemeButton() // Function for dark mode button
{
    let body = document.getElementsByTagName("body");
    let header = document.getElementsByClassName("top-nav-bar");
    let button1 = document.getElementById("Dark-mode-icon");
    let button2 = document.getElementById("Hint-icon");
    let button3 = document.getElementById("Game-instructions-icon");
    let footer = document.getElementsByClassName("footer");
    body[0].classList.toggle("dark-mode");
    header[0].classList.toggle("dark-mode");
    footer[0].classList.toggle("dark-mode");
    button1.classList.toggle("dark-mode");
    button2.classList.toggle("dark-mode");
    button3.classList.toggle("dark-mode");
}

function instructionsButton() // Function for game instructions button
{
    let gameInstructions = document.getElementsByClassName("instructions");
    gameInstructions[0].classList.toggle("hide");
}

function hintButton() // Function for game instructions button
{
    let gameHint = document.getElementsByClassName("info-bar");
    gameHint[0].classList.toggle("hide");
}

window.onload = function() { // This function runs when the window is loaded
    initialize();
    keyboardInput();
}

let answer; // global variable for game answer
let hint; // global variable for hint


const initialize = () => { // Initiailizing the answer and hint variable from the API.
    const fetchData = async () => { // Fetch the data from the API
        const res = await fetch("https://wordle-clone-production-111b.up.railway.app/api/get-word");
        let wordList = await res.json();
        return wordList
    }

    fetchData().then(wordList => { // Select a random word and write it into the global variables
        let length = wordList.length;
        let randomNumber = Number.parseInt(Math.random() * length);
        answer = wordList[randomNumber]["word"];
        hint = wordList[randomNumber]["hint"];
        const hintContent = document.getElementById("info-bar-content");
        hintContent.textContent = "Hint: " + hint; // Sets the text content of the info bar of the website
    });
}


const guessRows = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];

let numRows = guessRows.length; // Number of rows
let wordLength = guessRows[0].length; // Number of columns
let rowIndex= 0; // keeps track of rows
let gridIndex = 0; // Keeps track of columns


//Create a grid in html
const gridDisplay = document.querySelector('.grid-container');
guessRows.forEach((row, i) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', `row-${i}`);
    rowElement.setAttribute("class", "grid-row");
    row.forEach((grid, j) => {
        const gridElement = document.createElement("div");
        gridElement.setAttribute("id", `row-${i}-grid-${j}`);
        gridElement.setAttribute("class", "grid");
        rowElement.append(gridElement);
    })
    gridDisplay.append(rowElement);
})

//Keyboard input
function keyboardInput ()
{
    const hiddenInput = document.getElementById('hiddenInput');

    document.addEventListener('keyup', (event) => {
        if (event.key === 'Backspace') {
            deleteLetter();
        }
        else if (event.key === 'Enter') {
            submitAnswer();
        }
    });

    // Funnel mobile keystrokes from hidden input
    hiddenInput.addEventListener('input', () => {
        const value = hiddenInput.value;
        hiddenInput.value = ""; // clear so only single char at a time
        if (value) {
            handleKey(value);
        }
    });

    const gameArea = document.querySelector('.game');
    gameArea.addEventListener('click', () => hiddenInput.focus());

}

function handleKey(input) {
    if (input.match('^[a-zA-Z]{1}$')) {
        addLetter(input.toUpperCase());
    } else if (input === 'Backspace') {
        deleteLetter();
    } else if (input === 'Enter') {
        submitAnswer();
    }
}



// Add letter (Called when an alphabetical letter on the keyboard is pressed)
const addLetter = (letter) =>
{
    if (gridIndex < wordLength){
        guessRows[rowIndex][gridIndex] = letter;
        const grid = document.getElementById(`row-${rowIndex}-grid-${gridIndex}`);
        grid.textContent = letter;
        gridIndex++;
    }
}


// Delete letter (Called when Backspace is pressed)
const deleteLetter = () =>
{
    if (gridIndex > 0)
    {
        gridIndex--;
        guessRows[rowIndex][gridIndex] = '';
        const grid = document.getElementById(`row-${rowIndex}-grid-${gridIndex}`);
        grid.textContent = '';
    }
}


// Submit answer (Called when Enter is pressed)
const submitAnswer = () =>
{
    if (gridIndex == wordLength) // if the row is filled out, then the submit answer is valid
    {
        let didWin = showColors(); // Game logic function is called
        if (didWin == true) // If player wins
        {
            displayWinScreen();
        }

        // If the player fillss out the last row and still doesn't win (AKA loses)
        else if (didWin == false && rowIndex == numRows-1)
        {
            const infoBar = document.getElementsByClassName("info-bar");
            infoBar[0].setAttribute("id", "info-bar-loss");
            const lossMessage = document.getElementById("info-bar-content");
            lossMessage.textContent = `You missed the word ${answer} and lost!`; // Message for losing
            if (infoBar[0].classList.contains("hide"))
            {
                infoBar[0].classList.remove("hide");
            }
        }
        rowIndex++; // Moves on to the next row after each submission
        gridIndex = 0; // Moves to the first letter for a new word
    }
    else // If enter is pressed before 4 letters are entered, player gets a warning
    {
        window.alert("You must complete the word first");
    }
}

// Game logic that changes the colour of the grid
const showColors = () => 
{
    let didWin = true;
    let letterFrequency = {};
    for (let i=0; i < answer.length; i++) // Fills out the letterFrequency dictionary based on the letters in the answer
    {
        letter = answer[i].toUpperCase();
        if (letterFrequency[letter])
        {
            letterFrequency[letter] += 1; // Second occurrence of the letters onwards increments the frequency of the letter
        }
        else
        {
            letterFrequency[letter] = 1; // First occurrence of the letter initializes the frequency to 1
        }
    }

    for (let i=0; i<wordLength; i++) // Logic for correct letters in the correct order
    {
        let grid = document.getElementById(`row-${rowIndex}-grid-${i}`);
        let letter = guessRows[rowIndex][i];
        if (letter == answer[i].toUpperCase())
        {
            grid.classList.add("green");
            letterFrequency[letter] -= 1;
        }
    }
    for (let i=0; i<wordLength; i++) //Logic for correct letters in the wrong order and wrong letters
    {
        let grid = document.getElementById(`row-${rowIndex}-grid-${i}`);
        let letter = guessRows[rowIndex][i];

        if (!grid.classList.contains("green"))
        {
            if (answer.toUpperCase().includes(letter) && letterFrequency[letter] > 0)
            { // Logic for letters in the wrong order
                grid.classList.add("yellow");
                letterFrequency[letter] -= 1;
                didWin = false;
            }
            else
            { // Logic for wrong letters
                grid.classList.add("gray");
                didWin = false;
            }
        }
    }
    return didWin; // returns a boolean that is true only if all grids are green (correct word)
}

// Reset gameboard (this function is ran when the start over button is pressed)
const resetGame = () =>
{
    for (let i=0; i<numRows; i++)
    {
        for (let j=0; j<wordLength; j++)
        {
            const grid = document.getElementById("row-" + i + "-grid-" + j);
            grid.textContent = ''; // Grid contains blank
            if (grid.classList.contains("gray"))
            {
                grid.classList.remove("gray"); // Changes grids back to white
            }
            if (grid.classList.contains("yellow"))
            {
                grid.classList.remove("yellow"); // Changes grids back to white
            }
            if (grid.classList.contains("green"))
            {
                grid.classList.remove("green"); // Changes grids back to white
            }
            guessRows[i][j] = ''; // 2D array contains blank
        }
    }
    hideWinScreen(); // hides the congratulations image that pops up
    initialize(); // Grabs a new word from the dictionary
    rowIndex= 0;
    gridIndex = 0;
}

function displayWinScreen() // Display the congratulations image and change the colour of the info bar to red
{
    let gameContent = document.getElementsByClassName("grid-container");
    let winScreen = document.getElementById("Win-screen");
    let winMessage = document.getElementById("info-bar-content");
    gameContent[0].classList.add("hide");
    winScreen.classList.remove("hide");
    winMessage.textContent = `You guessed the word ${answer} correctly`;
    let infoBar = document.getElementsByClassName("info-bar");
    infoBar[0].setAttribute("id", "info-bar-win");
    if (infoBar[0].classList.contains("hide"))
    {
        infoBar[0].classList.remove("hide");
    }
    
}

function hideWinScreen() // Gets rid of the congratulations image and change the colour back to default
{
    let gameContent = document.getElementsByClassName("grid-container");
    let winScreen = document.getElementById("Win-screen");
    gameContent[0].classList.remove("hide");
    winScreen.classList.add("hide");

    let infoBar = document.getElementsByClassName("info-bar");
    if (!infoBar[0].classList.contains("hide"))
    {
        infoBar[0].classList.add("hide");
    }
    infoBar[0].removeAttribute("id");
}