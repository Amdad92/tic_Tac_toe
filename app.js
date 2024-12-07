let btns=document.querySelectorAll(".btn");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#newgame-btn");
let messageContainer=document.querySelector(".message-container");
let message=document.querySelector("#message");
let turn0=true; //playerX, playerY
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
   
];

//function for reset the game;
const resetGame=()=>{
    turn0=true;
    enableBtn();
    messageContainer.classList.add("hide");
};

btns.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerHTML="O";
            turn0=false;
        }else{
            box.innerHTML="X"
            turn0=true;
        }

        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }

        checkWinner();
    });
});

const gameDraw=()=>{
    message.innerHTML=`Game was draw`;
    messageContainer.classList.remove("hide");
    disableBtn;
};

const disableBtn=()=>{
    for(let btn of btns){
        btn.disabled=true;
    }
};

const enableBtn=()=>{
    for(let btn of btns){
        btn.disabled=false;
        btn.innerHTML="";
    }
};
const showWinner=(winner)=>{
    message.innerHTML=`Congratulations, winner is ${winner}`;
    messageContainer.classList.remove("hide");

    //if winner found other remaining btns will be disabled;
    disableBtn();
};
const checkWinner=()=>{
    for(let pattern of winPatterns){

        let pos1val=btns[pattern[0]].innerHTML;
        let pos2Val=btns[pattern[1]].innerHTML;
        let pos3Val=btns[pattern[2]].innerHTML;
        if(pos1val !="" && pos2Val !="" && pos3Val !==""){
            if(pos1val===pos2Val && pos2Val===pos3Val){
                console.log("winner",pos1val);
                showWinner(pos1val);
            }
        }

    }
  
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);