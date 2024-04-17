const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


// variables banaviya 
// currentPlayer ni default value apde "X" rakhiye chiye
let currentPlayer;
// aa gameGrid thi apde naki kari shakiye k apdi game nu current Status shu che? ..shu apde vadhare terms(daav) apvo joiye players ne k pachi Game puri thai gai che te janva mate apde aa gameGrid varible no use karishu.........badh aj grid na shell feel thai gaya che k nathi thaya 
// Starting ma gameGrid empty hase 
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    // currentPlayer ni default value apde "X" rakhiye chiye
    currentPlayer = "X";
    // Starting ma gameGrid empty hase 
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko...UI upar pan dekhadvu padshe ne k  badha j Game-Grid empty che starting ma........avu karva mate apde "forEach" loop lagadishu 

    boxes.forEach((box, index) => {
        // badha j box ne apde Empty kariya.....aa case atle lidho kem k...have apde akhi game ramiya pachi abdha j box bharay jay pachi jyare new-game start kariye tyare aa dekhadvu pade.
        box.innerText = "";
        // apde jyare new game start thai te pahela pointerEvent(corsour) ne j pan game-grid bharayelu hoy "X" or "O" thi te game-grid mate apde apde "none" kareli mate te j none kareli tene dur kari ne badha j game-grid upar pachi chalu karishu
        boxes[index].style.pointerEvents = "all";
        //initialise box with css properties again...green color ne remove karishu...to tena mate j CSS ni default property hati te game puri thaya pachi navi game ma farithi apply kari do.
        // apde darek box ne 2 classes api hati mate te apde ahiya add karishu..j thi te pahela j default CSS propety api hati te avi jashe...and ahiya "box${index+1}" karelu che kem k index hamesha '0' ti start thay(ahiya 0 thi 8 [0-8] total 9 box che mate ) and apde box ne className box1 to box9(box1-box9) apela che mate te className melavava mate apde 'index+1' karelu che...and darek box ma nava nava number lavava mate apde '$' and '{}' no use karelo che 
        box.classList = `box box${index+1}`;
    });

    // j aa newGame-button che tene apde game start thai jay atle invisible(remove) karva mangiye chiye mate ..aa button ma rahela 'active' class ne remove karishu
    newGameBtn.classList.remove("active");
    // initially jyare pan game start thashe tyare apde gameInfo vala paragraph ma current pleyer (ahiya apde default value tari ke "X" ne j pahela dekhadishu) kon che te dekhadvu che mate apde tene SET karishu...atle ne k UI upar te current Player nu Name Render karavishu.
    // currentPlayer ne j value che te sodhva mate apde pahela "$" ni sign laishu and pachi OBJECT-OPERATOR "{}" no use kari ne j value joiye che tenu name apde tema nakhva nu.
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// function ne call karishu j UI upar apde j joiye che te visible bane
initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update...current player ne update kariyu
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    // apde badhi j winning-postion upar forEach loop lagaviyo and have check karishu k j pan winning postion che te mathi koi pan aek winning position upar /wiinning index upar same j value "X" or "O" che?? ...jo winning postion/index upar same j j value "X" or "O" hoy to te  case a te USER win(jiti) jashe/thashe. 
    // ahiya j ["postion"] che te WIN THAVA MATE J 3 INDEX JOIYE TE DARSHAVE CHE......for example position=[3,4,5] che to te case ma postion[0]=3rd(index) thashe....position[1]=4th(index) thashe...postion[2]=5th(index) thashe.
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value...darek postion ma 3 index/box(winning) che. 
        
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //WINNNER mali jay atle badha j BOXES ni pointer events disable kari daishu ..j thi te agal koi bija box upar click na kari shake.
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner..apde upar joi lidhu k kon jite che ...to apde te perticulor box upar Green color mark karvo padshe...j thi apde te box upar "win" vali class add kari 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner....to apdi pase winner mali jay to apde sauthi pahela j sauthi upar np paragraph che jya current-player nu name ave tyare apde winner nu name lavishu and niche newGame nu button lavishu.
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        // have apanane winner mali gayo che ne upar ni vastu apde dekhadi didhhi che to have apde...return karishu ....jo return nahi kariye ne to aa function agal ne agal WINNER mali jashe to pan chalshe.....mate return karvu jaruri che .
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    // apde gamegrid upar forEach loop chalayo and joyu k kayo box a bharelo che/kayo box a empty nathi...j pan box(game-grid) bharelo hoy(filled) hot to te box/gamegrid ne fillcount ma add kari daishu.
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE...........jyare abdha j box/game grid bharela hoy and winner na male tyare game TIE thashe.
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    // perticulor index no gameGrid a empty hoy to j apde niche ni process karishu...jo box[index] ma rahelu box a empty che to tema apde pahela currentPlayer("X" or "O") ne nakhishu.....have aa box update thashe mate teno matalab che k apde UI ne update karishu
    if(gameGrid[index] === "" ) {
        // aa vali line a UI ne change/update kare che.....aaa outer logic che 
        boxes[index].innerText = currentPlayer;
        // aa vali line a Game-Grid ne change/Update kare che.....aa inner logic che  
        gameGrid[index] = currentPlayer;
        // jo koi box ne value mali che (ahiya "X" k "O") to teva cae ma apde cursor ne point nahi karaviye te box upar.......atle k teni pointerEvent NONE kari do ........atle k j pan Game0Grid ma apde "X" k "O" nakhishu te Game-Grid upar cursor point nahi thay ..........j game-grid empty hase tya aa cursor jashe.
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko...atle k jo "X" no turn puro thayo hoy to have "O" no turn avshe and jo ...."O" no turn puro thai gayo hoy to "X" no turn avshe 
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}



// apde badha j box upar jaiye chiye and badha j box upar eventListener lagavishu......and j pan box(buutton) upar click thay che te box(button) ne pachi UNCLICKABLE kari daishu...j tic-tac-toe game no rule che.........ahiya apde (box, index) ma box ni  sathe sathe....index lidhi che j thi khabar pade k kaya boc upar apde eventListener lagavelu che or kaya box ne upar exactly apde click karelu che
// index thi apde exact clas banavi shakiye chiye(box1,box2,bo3....box9) sudhi...mate apde eventListerner ma event.taget no use nathi karelo...jo apde ahiya box number 6 upar click kariye to khabar padi jay k index 6(or 5) vala box upar apde click karelu che j thi apanane te perticulor box no class k property hoy te mali jay che ...mate aa case ma apde event.taget lagava ni jarur nathi padti 
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


// jyare pan koi jiti jay or game puri thai jay tyare j newGame valu button ave che tema click karo atle j initially j UI hatu te avi javu joiye ... atle k sauthi pahela j vu hatu avu avi javu joiye aa mate apde eventListener lagavi didhu  
newGameBtn.addEventListener("click", initGame);