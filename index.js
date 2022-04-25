window.addEventListener('DOMContentLoaded', () => {
    // playground tic tac toe
    const playgrounds = Array.from(document.querySelectorAll('.playground'));
    // display current player
    const playerDisplay = document.querySelector('.display-player');
    // replay button
    const replayButton = document.getElementById('replay');
    // Annonce the winner
    const announcer = document.querySelector('.announcer');
    
    // Initialise the tab array
    let tab = new Array();
    tab.push('', '', '', '', '', '', '', '', '')
    // Initialisation of the current player

    let currentPlayer = 'X';
    const winnerX = 'winnerX';
    const winnerO = 'winnerO';

    const TIE = 'TIE';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const isValidAction = (playground) => {
        if (playground.innerText === 'X' || playground.innerText === 'O'){
            return false;
        }
        return true;
    };
    const updateBoard =  (index) => {
        tab[index] = currentPlayer;
    }
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    let scoreX = 0;
    let scoreO = 0;
    localStorage.setItem("scoreX", 0)
    localStorage.setItem("scoreO", 0)
    const announce = (type) => {
        switch(type){
           case winnerO:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                localStorage.setItem('scoreO', ++scoreO)
                document.getElementById('score2').innerHTML = localStorage.getItem('scoreO')
                break;
           case winnerX:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                localStorage.setItem('scoreX', ++scoreX)
                document.getElementById('score1').innerHTML = localStorage.getItem('scoreX')
                break;
           case TIE:
                announcer.innerText = 'Tie';
            }
        announcer.classList.remove('hide');
    };
    // Get the modal Annonce 
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          const a = tab[winCondition[0]];
          const b = tab[winCondition[1]];
          const c = tab[winCondition[2]];
          if (a === "" || b === "" || c === "") {
            continue;
          }
          if (a === b && b === c) {
            roundWon = true;
            break;
          }
        }
        if (roundWon) {
          announce(currentPlayer === "X" ? winnerX : winnerO);
          modal.style.display = "block"
          return;
        }
        if (!tab.includes("")) announce(TIE);
      }
      const userAction = (playground, index) => {
        if (isValidAction(playground)) {
          playground.innerText = currentPlayer;
          playground.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          handleResultValidation();
          changePlayer();
        }
      };
      playgrounds.forEach( (playground, index) => {
        playground.addEventListener('click', () => userAction(playground, index));
    });
    const resetTab = () => {
        tab = ['', '', '', '', '', '', '', '', ''];
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
        playgrounds.forEach(playground => {
            playground.innerText = '';
            playground.classList.remove('playerX');
            playground.classList.remove('playerO');
        });
    }
    const timerElement = document.getElementById("timer")
    
    function debutPlaying () {
        const departMinutes = 3;
        let temps = departMinutes * 60
        setInterval(() => {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)
        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes
        timerElement.innerText = `${minutes}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        }, 1000)

        if (temps===0){
            alert("Temps fini")
        }
    }
    debutPlaying();
    
    replayButton.addEventListener('click', function(){
        resetTab; debutPlaying()
    })
    })