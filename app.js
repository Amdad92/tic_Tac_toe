let btn=document.querySelectorAll(".btn");
let resetBtn=document.querySelector("#reset-btn");
let turn0=true; //playerX, playerY

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
   
]