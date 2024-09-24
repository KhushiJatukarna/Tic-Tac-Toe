// Select DOM elements for the game
let audioTurn = new Audio("ting.mp3"); // Sound effect for a player's turn
let audioGameOver = new Audio("gameover.mp3"); // Sound effect for when the game ends
let audioDraw = new Audio("draw.mp3"); // Sound effect for a draw scenario
const boxes = document.querySelectorAll(".box"); // All game boxes
const resetBtn = document.querySelector("#reset-btn"); // Reset button
const newGameBtn = document.querySelector("#new-btn"); // New game button
const msgContainer = document.querySelector(".msg-container"); // Message display container
const msg = document.querySelector("#msg"); // Message text element

// Game state variables
let turnO = true; // Track whose turn it is: true for Player O, false for Player X
let count = 0; // To track the number of moves made (and detect draws)

// Winning patterns for Tic-Tac-Toe
const winPatterns = [
    [0, 1, 2], // Horizontal rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
];

// Function to reset the game state
const resetGame = () => {
    turnO = true; // Reset to Player O's turn
    count = 0; // Reset move count
    enableBoxes(); // Enable all boxes for a new game
    clearWinningLines(); // Remove any winning lines from the previous game
    msgContainer.classList.add("hide"); // Hide message container
};

// Add event listeners to each box for player clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Update the box with the current player's symbol
        if (turnO) {
            // Player O's turn
            box.style.color = "#9ef01a";
            box.innerText = "O";
            turnO = false; // Switch to Player X's turn
        } else {
            // Player X's turn
            box.style.color = "#ff0a54";
            box.innerText = "X";
            turnO = true; // Switch to Player O's turn
        }

        // Disable the box and add the inactive class after it's clicked
        box.disabled = true;
        box.classList.add("inactive"); //Mark the box as inactive
        audioTurn.play();  // Play turn sound
        count++; // Increment the move count

        // Check for a winner after each move
        let isWinner = checkWinner();

        // If all boxes are filled and there's no winner, it's a draw
        if (count === 9 && !isWinner) {
            gameDraw();

        }
    });
});

// Function to handle game draw scenario
const gameDraw = () => {
    msg.innerText = "Game was a Draw"; // Update message for draw
    audioDraw.play();  // Play draw sound
    msgContainer.classList.remove("hide"); // Show message container
    disableBoxes(); // Disable all boxes
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true; // Disable each box
    });
};

// Function to enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false; // Enable each box
        box.innerText = ""; // Clear the text in each box
    });
};

const clearWinningLines = () => {
    boxes.forEach(box => {
        box.classList.remove("winning-box", "horizontal-line", "vertical-line", "diagonal-left-line", "diagonal-right-line");
    });
};

// Function to show the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations!!!!! Winner is ${winner}`; // Update message with winner
    msgContainer.classList.remove("hide"); // Show message container
    disableBoxes(); // Disable all boxes
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;  //Destructure the pattern array
        // Get values from the boxes that correspond to the winning pattern
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        // Check if all three positions have the same value and are not empty
        if (pos1Val && pos1Val === pos2Val && pos1Val === pos3Val) {
            addWinningLine(a,b,c); //Add a line across the winning boxes
            showWinner(pos1Val); // Show the winner
            audioGameOver.play();  //play gameover sound
            return true; // Return true if there's a winner
        }
    }
    return false; // Return false if there's no winner
};

const addWinningLine = (a, b, c) => {
    let isHorizontal = (a % 3 === 0 && b === a + 1 && c === a + 2);
    let isVertical = (a < 3 && b === a + 3 && c === a + 6);
    let isDiagonalLeft = (a === 0 && b === 4 && c === 8);
    let isDiagonalRight = (a === 2 && b === 4 && c === 6);

    // Add the winning-box class to the three winning boxes
    boxes[a].classList.add("winning-box");
    boxes[b].classList.add("winning-box");
    boxes[c].classList.add("winning-box");

    // Determine the type of line and apply the appropriate class
    if (isHorizontal) {
        boxes[a].classList.add("horizontal-line");
        boxes[b].classList.add("horizontal-line");
        boxes[c].classList.add("horizontal-line");
    } else if (isVertical) {
        boxes[a].classList.add("vertical-line");
        boxes[b].classList.add("vertical-line");
        boxes[c].classList.add("vertical-line");
    } else if (isDiagonalLeft) {
        boxes[a].classList.add("diagonal-left-line");
        boxes[b].classList.add("diagonal-left-line");
        boxes[c].classList.add("diagonal-left-line");
    } else if (isDiagonalRight) {
        boxes[a].classList.add("diagonal-right-line");
        boxes[b].classList.add("diagonal-right-line");
        boxes[c].classList.add("diagonal-right-line");
    }
};

// Event listeners for buttons to reset or start a new game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);





