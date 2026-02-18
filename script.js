const board=document.querySelector('.board');
const startbtn=document.querySelector(".btn-start");
const modal=document.querySelector(".modal");
const startgamemodal=document.querySelector(".start-game");
const endgamemodal=document.querySelector(".game-over");    
const restartbtn=document.querySelector(".btn-restart");

const highscoreEle=document.querySelector("#high-score");
const scoreEle=document.querySelector("#score")
const timeEle=document.querySelector("#timee")


const blockheight=30;
const blockwidth=30;

let highscore=localStorage.getItem("highscore")||0;
let score=0;
let tima='00-00';

highscoreEle.innerText=highscore;

const blocks={};
let snake=[{
    x:1,y:3
}
]


let direction='down';
let intervalid=null;
let timerid=null;

const cols=Math.floor(board.clientWidth/blockwidth);
const rows=Math.floor(board.clientHeight/blockheight);
let food={
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)
}

// for(let i=0;i<rows*cols;i++){
//     const block=document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }
for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
        const block=document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
       // block.innerText=`${row}-${col}`;
        blocks[`${row}-${col}`]=block;
    }
}

function render(){
      let head=null;
       blocks[`${food.x}-${food.y}`].classList.add("food");
    if(direction=="left"){
        head={x:snake[0].x,y:snake[0].y-1}
    }
    else if(direction=="right"){
         head={x:snake[0].x,y:snake[0].y+1}
    }
    else if(direction=="down"){
         head={x:snake[0].x+1,y:snake[0].y}
    }
    else if(direction=="up"){
         head={x:snake[0].x-1,y:snake[0].y}
    }

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        clearInterval(intervalid);
        modal.style.display="flex";
        startgamemodal.style.display="none";
        endgamemodal.style.display="flex";
    }
///food consume

    if(head.x==food.x && head.y==food.y){
         blocks[`${food.x}-${food.y}`].classList.remove("food");
        food={
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)
    }
     blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);
    score+=10
    scoreEle.innerText=score;
    if(score>highscore){
        highscore=score;
        localStorage.setItem("highscore",highscore.toString());
       // highscoreEle.innerText = highscore;
    }

    }

    snake.forEach(element=>{
          blocks[`${element.x}-${element.y}`].classList.remove("fill")
    })

    snake.unshift(head);
    snake.pop();
    snake.forEach(element => {
     blocks[`${element.x}-${element.y}`].classList.add("fill")
    });

}

// intervalid=setInterval(()=>{
//     render();
// },600);

startbtn.addEventListener("click",()=>{
    modal.style.display="none";
    intervalid=setInterval(()=>{
    render();
},500);
timerid=setInterval(()=>{
    let [min,sec]=tima.split("-").map(Number);
    if(sec==59){
        min+=1;
        sec=0;
    }
    else{
        sec+=1;
    }
    tima=`${min}-${sec}`;
    timeEle.innerText = tima;   
},1000)
})

restartbtn.addEventListener("click",restartgame)

function restartgame(){
    clearInterval(intervalid)
       blocks[`${food.x}-${food.y}`].classList.remove("food");
       snake.forEach(element=>{
   const block = blocks[`${element.x}-${element.y}`];
   if(block){
      block.classList.remove("fill");
   }
})
score=0;
scoreEle.innerText = score;
tima='00-00'
timeEle.innerText = tima;
highscoreEle.innerText = highscore;
       
    modal.style.display="none";
    snake=[{x:1,y:3}];
    direction="down"
    food={
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)
}
intervalid=setInterval(()=>{
    render();
},400)
    
}




window.addEventListener("keydown", function(event){
    if(event.key === "ArrowLeft"){
        direction = "left";
    }
    else if(event.key === "ArrowRight"){
        direction = "right";
    }
    else if(event.key === "ArrowUp"){
        direction = "up";
    }
    else if(event.key === "ArrowDown"){
        direction = "down";
    }
});