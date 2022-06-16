import React, {useEffect, useState} from "react";
import Board from "./Board";
function Game({channel, PlayerNumber, setPlayerNumber}) {
    // playersJoined = true for all players joined, false otherwise
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({ winner: "none", state: "none" });
    // console.log("hiiiiiiiiiiiiiiiiiii")// will print whenever channel mein change hoga ya iske parent mein change hoga
    // console.log("I am ", PlayerNumber, " from Game.js")
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
      });
    channel.on("user.watching.stop", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });
    
    if (!playersJoined){
        return <div> Waiting for Rival to Join</div>
    }
    return <div className="gameContainer">
    <h1>World's Best Tic Tac Toe</h1>
    {result.state === "none" && <Board result={result} setResult={setResult} PlayerNumber={PlayerNumber} setPlayerNumber={setPlayerNumber}/>}
    {/* chat */}
    {/* Leave Game */}
    {result.state === "won" && <div> {result.winner} Won The Game</div>}
    {result.state === "tie" && <div> Game Tie</div>}

    
    </div>
}

export default Game;