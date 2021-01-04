

document.addEventListener('DOMContentLoaded', () =>{
    const slots = document.querySelectorAll('.slot');
    const resetButton = document.querySelector('.reset');
    const forfitButton = document.querySelector('.forfit div');
    const outcome = document.querySelector('#outcome');
    const showPlayer = document.querySelector('#currentPlayer');
    let currentPlayer = 1;
    let gameInProgress = true;
    
    
    //Arranging elements from slots into columns so we can access entire sections of the grid, for example: This will be used to highlight whichever column the player is hovering over.
    
    const column0 = [slots[35], slots[28], slots[21], slots[14], slots[7], slots[0]];
    const column1 = [slots[36], slots[29], slots[22], slots[15], slots[8], slots[1]];
    const column2 = [slots[37], slots[30], slots[23], slots[16], slots[9], slots[2]];
    const column3 = [slots[38], slots[31], slots[24], slots[17], slots[10], slots[3]];
    const column4 = [slots[39], slots[32], slots[25], slots[18], slots[11], slots[4]];
    const column5 = [slots[40], slots[33], slots[26], slots[19], slots[12], slots[5]];
    const column6 = [slots[41], slots[34], slots[27], slots[20], slots[13], slots[6]];
    const colArray = [column0, column1, column2, column3, column4, column5, column6];
    
    
    //Functions 

    const reset = () => {
        gameInProgress = true;
        currentPlayer = 1;
        currentColor = 'Yellow';
        showPlayer.innerHTML = currentPlayer;
        showColor.innerHTML = currentColor;
        for (var i=0; i<slots.length; i++){
            if (slots[i].classList.contains('red')){
                slots[i].classList.remove('red');
            }
            if (slots[i].classList.contains('yellow')){
                slots[i].classList.remove('yellow');
            }
            if (slots[i].classList.contains('taken')){
                slots[i].classList.remove('taken');
            }
            if (slots[i].classList.contains('showWin')){
                slots[i].classList.remove('showWin');
            }
        }
        outcome.innerHTML = ' ';
    }

    const forfit = () => {
        gameInProgress = false;
        if (currentPlayer==1){
            outcome.innerHTML = "Player 2 wins";    
        }else{
            outcome.innerHTML = "Player 1 wins";
        }
        currentPlayer = 1;
        currentColor = 'Yellow';
        showPlayer.innerHTML = currentPlayer;
        showColor.innerHTML = currentColor;
    }

    const checkForWin = () => {
        //Array of all the ways to win connect-4, this is publically avalable infomation. 
        const winningCombinations = [ [0, 1, 2, 3], [1, 2, 3, 4], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],[20, 19, 18, 17],
        [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],[1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
        [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
        [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],[13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38],
        [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
        [11, 7, 23, 29], [12, 18, 24, 30],  [41, 40, 39, 38], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 2], 
        [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] ]

        for (var i = 0; i<winningCombinations.length; i++){
            const aSlot = slots[winningCombinations[i][0]];
            const bSlot = slots[winningCombinations[i][1]];
            const cSlot = slots[winningCombinations[i][2]];
            const dSlot = slots[winningCombinations[i][3]];

            if (aSlot.classList.contains('red') && bSlot.classList.contains('red') && cSlot.classList.contains('red') && dSlot.classList.contains('red')){
                outcome.innerHTML = "Player 2 Wins";
                aSlot.classList.add('showWin');
                bSlot.classList.add('showWin');
                cSlot.classList.add('showWin');
                dSlot.classList.add('showWin');
                gameInProgress = false;
            }else if (aSlot.classList.contains('yellow') && bSlot.classList.contains('yellow') && cSlot.classList.contains('yellow') && dSlot.classList.contains('yellow')){
                outcome.innerHTML = "Player 1 Wins";
                aSlot.classList.add('showWin');
                bSlot.classList.add('showWin');
                cSlot.classList.add('showWin');
                dSlot.classList.add('showWin');
                gameInProgress = false;
            }
        }
    }


    const getInfo = (slot) => {
        return Array.from(slot.classList);
    }

    const getLowestEmptySlot = (colIndex) => {
        // for each slot in the selected column, check if its the bottom slot or if the slot below it is taken. return the bottom slot if non are taken,
        // otherwise, return the slot above the top most taken slot
        for (var i=5; i>=0; i--){
            //set x to be the "i"th element in the current selected column
            const x = colArray[colIndex][i];
        
            //check if were at the bottom of the column, and return x if we are 
            if (i==0){
                return x;
    
            //check if the div below the current div has been taken, and return x if it is.
            }else {
                const info = getInfo(colArray[colIndex][i-1]);
                if ((info.find(slotClass => slotClass.includes('taken')))){
                    return x;
                }
            }      
        }
    }

    const handleHover = (e) => {
        //First we find what column the player is hovering over
        const currentSlot = e.target;
        const info = getInfo(currentSlot);
        const currentCol = info.find(slotClass => slotClass.includes('col'));
        const colIndex = parseInt(currentCol[4], 10);
        //Now we get all items in that column to highlight them
        for (var i=0; i<6;i++){
            const x = colArray[colIndex][i];
            x.classList.add("hovering");
        }
    }
    
    const handleHoverOff = (e) => {
        //Just undoing what the handel hover did, there's probably a better way but im pretty new to this. 
        const currentSlot = e.target;
        const info = getInfo(currentSlot);
        const currentCol = info.find(slotClass => slotClass.includes('col'));
        const colIndex = parseInt(currentCol[4], 10);
        //Now we get all items in that column to highlight them
        for (var i=0; i<6;i++){
            const x = colArray[colIndex][i];
            x.classList.remove("hovering");
        }
    }

    const handleClick = (e) => {
        //Checks that the game is still in progress
        if (!gameInProgress){
            reset();
        }
        //First we want to find what column the player has clicked on
        const currentSlot = e.target;
        const info = getInfo(currentSlot);
        const currentCol = info.find(slotClass => slotClass.includes('col'));
        const colIndex = parseInt(currentCol[4], 10);
        //Get the lowest emply slot in the current column and fill it with the correct color
        const slotToFill = getLowestEmptySlot(colIndex);
        if (currentPlayer == 1){    
            slotToFill.classList.add('yellow');
            slotToFill.classList.add('taken');
            currentPlayer = 2;
            currentColor = 'Red';
            showPlayer.innerHTML = currentPlayer;
            showColor.innerHTML = currentColor;
        }else{
            slotToFill.classList.add('red');
            slotToFill.classList.add('taken');
            currentPlayer = 1;
            currentColor = 'Yellow';
            showPlayer.innerHTML = currentPlayer;
            showColor.innerHTML = currentColor;
        }
        checkForWin();
    }
    
    //Event handlers

    for (var i = 0; i<slots.length; i++){
        slots[i].addEventListener('mouseover', handleHover); 
        slots[i].addEventListener('click', handleClick);
        slots[i].addEventListener('mouseout', handleHoverOff);
    }
    
    document.getElementById("resetButton").addEventListener("click", reset);
    document.getElementById("forfitButton").addEventListener("click", forfit);


    //==========================================================================================//
    /*The folowwing code deals with creating multiple games at once and swapping between them. Sadly, due to issues
    actually playing multiple games at once does not work, but they can still be created*/
    const games = document.querySelectorAll('.gameID');
    let gameCount = 0;
    const getGameInfo = (game) => {
        return Array.from(game.classList);
    }


    function goToGame(){
        /*this functions needs to save your progress in current game and display the
        selected game you wish to veiw from where you left off in it previously
        NOTE: very important that you check the game number in the calssname so 
        that you go to the corect game according to which button was clicked*/
        //looks something like this:
        //const desiredGame = parseInt(games[4], 10); 

        alert("went");
    }


    function createGame(){
        //First, create a new div in the left hand box which displays all current games
        gameCount+=1;
        var div = document.createElement('div');
        div.classList.add('gameID');
        div.id = ("num"+String(gameCount));
        document.getElementsByClassName('fillBox')[0].appendChild(div);

        //Next, add a header with the game number and eventually who the game is against
        var head = document.createElement('h1');
        head.innerHTML = "Game "+String(gameCount);
        document.getElementById('num'+String(gameCount)).appendChild(head);

        //then, add a span to this div which will allow the player turn to be displayed
        var playerDisplay = document.createElement('span');
        playerDisplay.id = 'displayColor';
        playerDisplay.innerHTML = 'Yellow';
        document.getElementById('num'+String(gameCount)).appendChild(playerDisplay);

        //Then, add an event listener so that when clicked, we navigate to the game
        div.addEventListener('click', goToGame);

        //The next step once the server side is closer to being done, is displaying the new gameboard
    }

    

    const newGameBtn = document.querySelector('.newGameBtn');
    newGameBtn.addEventListener('click', createGame)


    

    for (var i = 0; i<games.length; i++){
        games[i].addEventListener('click', goToGame);
    }
})



