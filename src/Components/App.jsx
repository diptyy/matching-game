import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import OneCard from "./Card";
import GameOver from "./GameOver";

function App(){

    const [flippedCards, setFlippedCards] = useState(0);    
    const [turns, setTurns] = useState(0);
    const [timer, setTimer] = useState("00:00");
    const [stopwatch, setStopwatch] = useState("00:00");
    var seconds = 0;
    var minutes = 0;
    const [gameWon, setGameWon] = useState(false);

    function startTimer() {
        if (gameWon === false){
         setStopwatch(setInterval(add, 1000));
        }
         return;
    }

    function stopTimer(){
            console.log("hello");
            clearInterval(stopwatch);
            seconds = 0;
            minutes = 0;
            return;
    }
  
    function add() {
        if (gameWon){
            return;
        }
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        setTimer((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds))   
        return;
    }

    var cardArray = [];
    for (var i = 0; i < 12; i++){
         cardArray[i] = {
            id: i,
            matchId: Math.floor(i / 2),
            isFlipped: false,
            isSolved: false
        }
    };

    function shuffleCards(){
        return cardArray.sort( () => .5 - Math.random() );
    }
    let shuffledCards = shuffleCards();
    const [allCards, setAllCards] = useState(shuffledCards)

    function handleClick(event){
        
        if (turns === 0 && flippedCards === 0){
            startTimer();
        }

        let { id } = event.target;
        id = parseInt(id, 10)

        const allFlippedCards = allCards.filter(card => {
            return card.isFlipped === true && card.isSolved === false
        })

        if (allFlippedCards.length === 2){
            return;
        }


        let cardIndex = allCards.findIndex(card => card.id === id);
        let newArray = [...allCards];
        newArray[cardIndex].isFlipped = true; 
        setAllCards(newArray)

        if (flippedCards === 0){
            setFlippedCards(1);
        } else if (flippedCards === 1){
            setFlippedCards(2);
            setTurns((prevValue) => {
                if (prevValue === 0){
                    return 1;
                } else {
                    return prevValue + 1;
                }
            });
            console.log(turns);
            cardMatch();
        } 
        return;
    }

    function cardMatch(){
        const cardsToMatch = allCards.filter(card => {
            return card.isFlipped === true && card.isSolved === false
        })

        if (cardsToMatch[0].matchId === cardsToMatch[1].matchId){
            let cardIndex1 = allCards.findIndex(card => {return card.id === cardsToMatch[0].id});
            let newArray = [...allCards];
            newArray[cardIndex1].isSolved = true; 
            setAllCards(newArray)

            let cardIndex2 = allCards.findIndex(card => {return card.id === cardsToMatch[1].id});
            let newArray2 = [...allCards];
            newArray[cardIndex2].isSolved = true; 
            setAllCards(newArray2)

            setFlippedCards(0);
            checkWin();
        } else {
            setTimeout(() => flipBack(), 800);
        }

    }

    function flipBack(){
        const cardsToFlip = allCards.filter(card => {
            return card.isFlipped === true && card.isSolved === false
        })

        let cardIndex1 = allCards.findIndex(card => {return card.id === cardsToFlip[0].id});
            let newArray = [...allCards];
            newArray[cardIndex1].isFlipped = false;
            setAllCards(newArray)

            let cardIndex2 = allCards.findIndex(card => {return card.id === cardsToFlip[1].id});
            let newArray2 = [...allCards];
            newArray2[cardIndex2].isFlipped = false;
            setAllCards(newArray)

            setFlippedCards(0);
    };

    function checkWin(){
        const unsolved = allCards.filter(card => {
            return card.isSolved === false
        })
        if (unsolved.length != 0){
            return;
        } else {
            setTimeout(() => setGameWon(true), 1000)
            setTimer(timer);
            stopTimer();
            return;
        };
    };

    function restartGame(){
        setFlippedCards(0);
        setTimer("00:00");
        seconds = 0;
        minutes = 0;
        setGameWon(false);
        shuffledCards = shuffleCards();
        setAllCards(shuffledCards);
        setTurns(0);
    }
    
    return (
        <div>
        <Container maxWidth="lg">
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item container alignItems="stretch" className="headings">
                    <Grid item xs={6}>Perfect Match</Grid>
                    <Grid item xs={3}>{turns} <span className="stats">turns</span></Grid>
                    <Grid item xs={3}> {timer}</Grid>
                </Grid>
                <Grid item container spacing={4}>
                    {allCards.map(card => {return <OneCard key={card.id} id={card.id} card={card} onClick={handleClick} />})}
                </Grid>
            </Grid>
            {gameWon ? <GameOver time={timer} turns={turns} onClick={restartGame} /> : null}
        </Container>
        </div>
    )
}

export default App;