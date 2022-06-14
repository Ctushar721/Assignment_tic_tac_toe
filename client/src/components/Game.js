import React, {useState} from "react";
import Board from "./Board";
function Game({channel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({ winner: "none", state: "none" });
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
      });
    if (!playersJoined){
        return <div> Waiting for Rival to Join</div>
    }
    return <div className="gameContainer">
    <h1>T-T-T</h1>
    <Board result={result} setResult={setResult}/>
    {/* chat */}
    {/* Leave Game */}
    {result.state === "won" && <div> {result.winner} Won The Game</div>}
    {result.state === "tie" && <div> Game Tieds</div>}

    
    </div>
}

export default Game;