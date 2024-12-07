// Select all buttons (grid cells) in the game board
let btns = document.querySelectorAll(".btn");
// Select the reset and new game buttons
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
// Select the container and element for displaying messages
let messageContainer = document.querySelector(".message-container");
let message = document.querySelector("#message");

// Game state variables
let turn0 = true; // Indicates if it's Player O's turn (true for O, false for X)
let count = 0; // Keeps track of the total number of moves made

// Winning patterns for the game (index positions of the winning combinations)
const winPatterns = [
    [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [2, 4, 6], // Diagonal from top-right to bottom-left
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
];

// Function to reset the game state
const resetGame = () => {
    turn0 = true; // Reset to Player O's turn
    count = 0; // Reset the move counter
    enableBtn(); // Enable all buttons (grid cells)
    messageContainer.classList.add("hide"); // Hide the message container
};

// Add event listeners to each button (grid cell)
btns.forEach((box) => {
    box.addEventListener("click", () => {
        // Prevent action if the button is already disabled
        if (box.disabled) return;

        // Mark the grid cell with the player's symbol and toggle turns
        if (turn0) {
            box.innerHTML = "O";
            turn0 = false; // Switch to Player X's turn
        } else {
            box.innerHTML = "X";
            turn0 = true; // Switch to Player O's turn
        }

        box.disabled = true; // Disable the button to prevent multiple clicks
        count++; // Increment the move counter

        // Check if there's a winner or the game is a draw
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw(); // Trigger draw message if all moves are made and no winner
        }
    });
});

// Function to display a draw message and disable all buttons
const gameDraw = () => {
    message.innerHTML = `Game was draw`; // Set draw message
    messageContainer.classList.remove("hide"); // Show the message container
    disableBtn(); // Disable all buttons
};

// Function to disable all buttons (grid cells)
const disableBtn = () => {
    for (let btn of btns) {
        btn.disabled = true; // Disable each button
    }
};

// Function to enable all buttons and reset their content
const enableBtn = () => {
    for (let btn of btns) {
        btn.disabled = false; // Enable each button
        btn.innerHTML = ""; // Clear the content of each button
    }
};

// Function to display the winner message and disable remaining buttons
const showWinner = (winner) => {
    message.innerHTML = `Congratulations, winner is ${winner}`; // Set winner message
    messageContainer.classList.remove("hide"); // Show the message container
    disableBtn(); // Disable all buttons
};

// Function to check if there's a winner
const checkWinner = () => {
    // Iterate through all winning patterns
    for (let pattern of winPatterns) {
        // Get the values of the buttons in the current pattern
        let pos1val = btns[pattern[0]].innerHTML;
        let pos2Val = btns[pattern[1]].innerHTML;
        let pos3Val = btns[pattern[2]].innerHTML;

        // Check if all three positions are not empty and have the same value
        if (pos1val && pos1val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1val); // Log the winner to the console
            showWinner(pos1val); // Display the winner message
            return true; // Return true if a winner is found
        }
    }
    return false; // Return false if no winner
};

// Add event listeners to the reset and new game buttons
newGameBtn.addEventListener("click", resetGame); // New game button resets the game
resetBtn.addEventListener("click", resetGame); // Reset button also resets the game
